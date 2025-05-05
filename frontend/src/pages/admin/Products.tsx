
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductCategory } from '@/context/ProductContext';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  SearchIcon,
  X,
  Save,
  Upload,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import ImageUploader from '@/components/admin/ImageUploader';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name is required' }),
  category: z.string().min(2, { message: 'Category is required' }),
  subcategory: z.string().min(2, { message: 'Subcategory is required' }),
  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  stock: z.coerce.number().nonnegative({ message: 'Stock must be zero or positive' }),
  description: z.string().min(5, { message: 'Description is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const AdminProducts = () => {
  const { user, isAdmin } = useAuth();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateProductImage,
    updateProductStock,
    updateProductPrice
  } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isQuickEditMode, setIsQuickEditMode] = useState<Record<string, boolean>>({});
  const [quickEditValues, setQuickEditValues] = useState<Record<string, { stock: number, price: number }>>({});
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageEditProduct, setImageEditProduct] = useState<Product | null>(null);
  
  // Initialize quickEditValues with products data when products are loaded
  useEffect(() => {
    const initialValues: Record<string, { stock: number, price: number }> = {};
    products.forEach(product => {
      initialValues[product.id] = { 
        stock: product.stock,
        price: product.price
      };
    });
    setQuickEditValues(initialValues);
  }, [products]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: 'structural-materials',
      subcategory: '',
      price: 0,
      stock: 0,
      description: '',
    },
  });
  
  // Redirect if not logged in or not admin
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/customer/dashboard" />;
  }
  
  // Filter products based on search query and category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleOpenAddDialog = () => {
    setDialogMode('add');
    form.reset({
      name: '',
      category: 'structural-materials',
      subcategory: '',
      price: 0,
      stock: 0,
      description: '',
    });
    setIsDialogOpen(true);
  };
  
  const handleOpenEditDialog = (product: Product) => {
    setDialogMode('edit');
    setEditingProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setIsDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleOpenImageDialog = (product: Product) => {
    setImageEditProduct(product);
    setImageDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  const getSubcategoryOptions = (category: string): string[] => {
    switch (category) {
      case 'structural-materials':
        return [
          'Angles',
          'Channels',
          'Flats',
          'I Beams',
          'Square Rods',
          'Round Rods',
          'Bright Bars',
          'TMT Bars',
          'Weld Mesh',
        ];
      case 'steel-pipes':
        return [
          'MS Round Pipes',
          'MS Square Pipes',
          'MS Rectangle Pipes',
        ];
      case 'sheets-plates':
        return [
          'HR Sheets / Plates',
          'CR Sheets',
          'GI Sheets',
          'Roofing Sheets',
          'Chequered Sheets',
        ];
      default:
        return [];
    }
  };
  
  const onSubmit = (data: FormValues) => {
    if (dialogMode === 'add') {
      addProduct({
        name: data.name,
        category: data.category as ProductCategory,
        subcategory: data.subcategory,
        price: data.price,
        stock: data.stock,
        description: data.description,
        image: '/placeholder.svg',
      });
      toast.success('Product added successfully');
    } else if (dialogMode === 'edit' && editingProduct) {
      updateProduct({
        ...editingProduct,
        name: data.name,
        category: data.category as ProductCategory,
        subcategory: data.subcategory,
        price: data.price,
        stock: data.stock,
        description: data.description,
      });
      toast.success('Product updated successfully');
    }
    
    handleCloseDialog();
  };
  
  const handleDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success('Product deleted successfully');
    }
  };

  const handleImageUpdate = (imageUrl: string) => {
    if (imageEditProduct) {
      updateProductImage(imageEditProduct.id, imageUrl);
      setImageDialogOpen(false);
      setImageEditProduct(null);
    }
  };

  const toggleQuickEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setIsQuickEditMode(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));

    // Reset quick edit values to current product values when entering edit mode
    if (!isQuickEditMode[productId]) {
      setQuickEditValues(prev => ({
        ...prev,
        [productId]: {
          stock: product.stock,
          price: product.price
        }
      }));
    }
  };

  const handleQuickEditChange = (productId: string, field: 'stock' | 'price', value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setQuickEditValues(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: numValue
      }
    }));
  };

  const saveQuickEdit = (productId: string) => {
    const values = quickEditValues[productId];
    if (!values) return;
    
    // Validate values to ensure they're not negative
    const validStock = Math.max(0, values.stock);
    const validPrice = Math.max(0, values.price);
    
    // Update the product stock and price
    updateProductStock(productId, validStock);
    updateProductPrice(productId, validPrice);
    
    toggleQuickEdit(productId);
    toast.success('Product updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-steelblue-900">Products Management</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steelgray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="structural-materials">Structural Materials</SelectItem>
                <SelectItem value="steel-pipes">Steel Pipes</SelectItem>
                <SelectItem value="sheets-plates">Sheets / Plates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-steelgray-400 mx-auto mb-4" />
            <p className="text-steelgray-500 font-medium">No products found with the current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-contain w-full h-full"
                          onClick={() => handleOpenImageDialog(product)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {{
                        'structural-materials': 'Structural Materials',
                        'steel-pipes': 'Steel Pipes',
                        'sheets-plates': 'Sheets / Plates',
                      }[product.category]}
                    </TableCell>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell className="text-right">
                      {isQuickEditMode[product.id] ? (
                        <Input
                          type="number"
                          value={quickEditValues[product.id]?.price || product.price}
                          onChange={(e) => handleQuickEditChange(product.id, 'price', e.target.value)}
                          className="w-24 text-right"
                          step="0.01"
                          min="0"
                        />
                      ) : (
                        <>₹{product.price.toFixed(2)}</>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {isQuickEditMode[product.id] ? (
                        <Input
                          type="number"
                          value={quickEditValues[product.id]?.stock || product.stock}
                          onChange={(e) => handleQuickEditChange(product.id, 'stock', e.target.value)}
                          className="w-24 text-center"
                          min="0"
                        />
                      ) : (
                        <Badge
                          className={
                            product.stock > 10 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : product.stock > 0 
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' 
                                : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {product.stock > 0 ? product.stock : 'Out of Stock'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1 whitespace-nowrap">
                      {isQuickEditMode[product.id] ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-500 hover:bg-green-50"
                            onClick={() => saveQuickEdit(product.id)}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => toggleQuickEdit(product.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleQuickEdit(product.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Quick Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenImageDialog(product)}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Image
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditDialog(product)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleOpenDeleteDialog(product)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'add'
                ? 'Fill in the details to add a new product to the catalog.'
                : 'Update the product information.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue('subcategory', '');
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="structural-materials">Structural Materials</SelectItem>
                          <SelectItem value="steel-pipes">Steel Pipes</SelectItem>
                          <SelectItem value="sheets-plates">Sheets / Plates</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!form.getValues('category')}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getSubcategoryOptions(form.getValues('category')).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Product description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {dialogMode === 'add' ? 'Add Product' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Image Upload Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Product Image</DialogTitle>
            <DialogDescription>
              Upload a new image for {imageEditProduct?.name}
            </DialogDescription>
          </DialogHeader>
          
          {imageEditProduct && (
            <ImageUploader
              currentImage={imageEditProduct.image}
              onImageSelect={handleImageUpdate}
            />
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product "{productToDelete?.name}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
