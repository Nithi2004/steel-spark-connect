
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory, Product as ProductType } from '@/context/ProductContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Products = () => {
  const { category } = useParams<{ category?: ProductCategory }>();
  const navigate = useNavigate();
  const { getProductsByCategory, getProductSubcategories, addToCart } = useProducts();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    category as ProductCategory || 'structural-materials'
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories: Record<ProductCategory, string> = {
    'structural-materials': 'Structural Materials',
    'steel-pipes': 'Steel Pipes',
    'sheets-plates': 'Sheets / Plates',
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as ProductCategory);
    navigate(`/products/${value}`);
  };

  const products = getProductsByCategory(activeCategory);
  const subcategories = getProductSubcategories(activeCategory);

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  const handleAddToCart = (product: ProductType) => {
    if (!user) {
      toast.error('Please login to add products to your cart', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }

    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
    });

    // Reset quantity
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-steelblue-900 hero-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore our wide range of high-quality iron and steel products
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-steelgray-100">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <Tabs
            defaultValue={activeCategory}
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="structural-materials">Structural</TabsTrigger>
                <TabsTrigger value="steel-pipes">Pipes</TabsTrigger>
                <TabsTrigger value="sheets-plates">Sheets</TabsTrigger>
              </TabsList>
            </div>

            {Object.keys(categories).map((catKey) => (
              <TabsContent key={catKey} value={catKey} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-steelblue-900 mb-6">
                    {categories[catKey as ProductCategory]}
                  </h2>

                  {/* Group products by subcategory */}
                  {subcategories.map((subcategory) => (
                    <div key={subcategory} className="mb-10">
                      <h3 className="text-xl font-semibold text-steelblue-800 mb-4 border-b border-steelgray-300 pb-2">
                        {subcategory}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products
                          .filter((product) => product.subcategory === subcategory)
                          .map((product) => (
                            <div key={product.id} className="product-card">
                              <div className="flex flex-col h-full">
                                <div className="h-48 bg-white rounded-t-lg flex items-center justify-center overflow-hidden border-b">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="object-contain max-h-full max-w-full p-4"
                                  />
                                </div>
                                <div className="p-6 flex-grow">
                                  <h4 className="text-lg font-semibold text-steelblue-900 mb-2">{product.name}</h4>
                                  <p className="text-sm text-steelgray-600 mb-4">{product.description}</p>
                                  
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="text-steelgray-800">
                                      <span className="font-semibold">Price:</span> ₹{product.price.toFixed(2)}
                                    </div>
                                    <div className={`px-2 py-1 rounded text-sm ${
                                      product.stock > 10 
                                        ? 'bg-green-100 text-green-800' 
                                        : product.stock > 0 
                                          ? 'bg-yellow-100 text-yellow-800' 
                                          : 'bg-red-100 text-red-800'
                                    }`}>
                                      {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                    </div>
                                  </div>
                                  
                                  {user && (
                                    <div className="mt-4">
                                      <div className="flex items-center space-x-2">
                                        <div className="flex-1">
                                          <label htmlFor={`quantity-${product.id}`} className="sr-only">
                                            Quantity
                                          </label>
                                          <input
                                            id={`quantity-${product.id}`}
                                            type="number"
                                            min="1"
                                            value={quantities[product.id] || 1}
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-steelblue-500"
                                            disabled={product.stock === 0}
                                          />
                                        </div>
                                        <Button
                                          onClick={() => handleAddToCart(product)}
                                          disabled={product.stock === 0}
                                          className="flex items-center space-x-1"
                                        >
                                          <ShoppingCart className="h-4 w-4 mr-1" />
                                          <span>Add to Cart</span>
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {!user && product.stock > 0 && (
                                    <div className="mt-4 flex items-center text-steelblue-600">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      <span className="text-sm">Login to place an order</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Products;
