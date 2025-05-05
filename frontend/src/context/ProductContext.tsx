import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type ProductCategory = 'structural-materials' | 'steel-pipes' | 'sheets-plates';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  stock: number;
  description: string;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'requested' | 'approved' | 'rejected';
  date: string;
  originalTotal?: number; // For storing the original price before discount
};

type ProductContextType = {
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (userId: string, userName: string) => void;
  updateOrderStatus: (orderId: string, status: 'requested' | 'approved' | 'rejected') => void;
  findProductById: (id: string) => Product | undefined;
  updateOrderPrice: (orderId: string, newTotal: number) => void;
  updateProductImage: (productId: string, imageUrl: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  cartItems: [],
  orders: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  placeOrder: () => {},
  updateOrderStatus: () => {},
  findProductById: () => undefined,
  updateOrderPrice: () => {},
  updateProductImage: () => {},
  updateProductStock: () => {},
  updateProductPrice: () => {},
});

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  // Initial demo products
  const initialProducts: Product[] = [
    {
      id: '1',
      name: 'MS Angle 25x25x3mm',
      category: 'structural-materials',
      subcategory: 'Angles',
      price: 750.00,
      stock: 100,
      description: 'Mild steel angle, ideal for construction and fabrication.',
      image: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'MS Channel 75x40mm',
      category: 'structural-materials',
      subcategory: 'Channels',
      price: 1250.00,
      stock: 75,
      description: 'Standard mild steel channel for structural applications.',
      image: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'MS Flat 25x6mm',
      category: 'structural-materials',
      subcategory: 'Flats',
      price: 580.00,
      stock: 120,
      description: 'Flat mild steel bar for various construction needs.',
      image: '/placeholder.svg',
    },
    {
      id: '4',
      name: 'MS I Beam 100x50mm',
      category: 'structural-materials',
      subcategory: 'I Beams',
      price: 1800.00,
      stock: 50,
      description: 'Standard I-beam for structural support in construction.',
      image: '/placeholder.svg',
    },
    {
      id: '5',
      name: 'TMT Bar 8mm',
      category: 'structural-materials',
      subcategory: 'TMT Bars',
      price: 780.00,
      stock: 200,
      description: 'High-quality TMT reinforcement bar for concrete structures.',
      image: '/placeholder.svg',
    },
    {
      id: '6',
      name: 'MS Round Pipe 1 inch',
      category: 'steel-pipes',
      subcategory: 'MS Round Pipes',
      price: 450.00,
      stock: 85,
      description: 'Standard mild steel round pipe for various applications.',
      image: '/placeholder.svg',
    },
    {
      id: '7',
      name: 'MS Square Pipe 25x25mm',
      category: 'steel-pipes',
      subcategory: 'MS Square Pipes',
      price: 520.00,
      stock: 65,
      description: 'Square-section mild steel pipe for construction and furniture.',
      image: '/placeholder.svg',
    },
    {
      id: '8',
      name: 'MS Rectangle Pipe 50x25mm',
      category: 'steel-pipes',
      subcategory: 'MS Rectangle Pipes',
      price: 580.00,
      stock: 70,
      description: 'Rectangular section mild steel pipe for construction needs.',
      image: '/placeholder.svg',
    },
    {
      id: '9',
      name: 'HR Sheet 2mm',
      category: 'sheets-plates',
      subcategory: 'HR Sheets / Plates',
      price: 1050.00,
      stock: 40,
      description: 'Hot-rolled mild steel sheet for various industrial applications.',
      image: '/placeholder.svg',
    },
    {
      id: '10',
      name: 'CR Sheet 1mm',
      category: 'sheets-plates',
      subcategory: 'CR Sheets',
      price: 1250.00,
      stock: 35,
      description: 'Cold-rolled steel sheet with smooth finish for precision applications.',
      image: '/placeholder.svg',
    },
    {
      id: '11',
      name: 'GI Sheet 0.8mm',
      category: 'sheets-plates',
      subcategory: 'GI Sheets',
      price: 1450.00,
      stock: 30,
      description: 'Galvanized iron sheet with zinc coating for corrosion resistance.',
      image: '/placeholder.svg',
    },
    {
      id: '12',
      name: 'Roofing Sheet 0.5mm',
      category: 'sheets-plates',
      subcategory: 'Roofing Sheets',
      price: 980.00,
      stock: 60,
      description: 'Corrugated roofing sheet for industrial and residential roofing.',
      image: '/placeholder.svg',
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedProducts = localStorage.getItem('products');
    const storedCart = localStorage.getItem('cart');
    const storedOrders = localStorage.getItem('orders');

    setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
    setOrders(storedOrders ? JSON.parse(storedOrders) : []);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const findProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Update quantity if item already in cart
      updateCartItem(product.id, existingItem.quantity + quantity);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { productId: product.id, quantity, product }]);
    }
  };

  const updateCartItem = (productId: string, quantity: number) => {
    setCartItems(
      cartItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (userId: string, userName: string) => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    
    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      userName,
      items: [...cartItems],
      total,
      status: 'requested',
      date: new Date().toISOString(),
    };
    
    setOrders([...orders, newOrder]);
    clearCart();
  };

  // Updated function to update order price (for bulk discounts)
  const updateOrderPrice = (orderId: string, newTotal: number) => {
    setOrders(
      orders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              originalTotal: order.originalTotal || order.total, // Store original price if not already stored
              total: newTotal 
            } 
          : order
      )
    );
  };

  // Modified function to handle approved and rejected orders differently
  const updateOrderStatus = (orderId: string, status: 'requested' | 'approved' | 'rejected') => {
    const orderToUpdate = orders.find(order => order.id === orderId);
    
    if (orderToUpdate) {
      // Only update stock when order is approved
      if (status === 'approved') {
        orderToUpdate.items.forEach(item => {
          const product = findProductById(item.productId);
          if (product) {
            const newStock = Math.max(0, product.stock - item.quantity);
            updateProductStock(item.productId, newStock);
          }
        });
      }
      
      setOrders(
        orders.map(order => 
          order.id === orderId 
            ? { ...order, status } 
            : order
        )
      );
    }
  };

  // Enhanced function to update product image
  const updateProductImage = (productId: string, imageUrl: string) => {
    setProducts(
      products.map(product => 
        product.id === productId 
          ? { ...product, image: imageUrl } 
          : product
      )
    );
  };

  // Enhanced function to update product stock independently
  const updateProductStock = (productId: string, newStock: number) => {
    // Ensure stock is never negative
    const validatedStock = Math.max(0, newStock);
    
    setProducts(
      products.map(product => 
        product.id === productId 
          ? { ...product, stock: validatedStock } 
          : product
      )
    );
  };

  // Enhanced function to update product price independently
  const updateProductPrice = (productId: string, newPrice: number) => {
    // Ensure price is never negative
    const validatedPrice = Math.max(0, newPrice);
    
    setProducts(
      products.map(product => 
        product.id === productId 
          ? { ...product, price: validatedPrice } 
          : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        findProductById,
        updateOrderPrice,
        updateProductImage,
        updateProductStock,
        updateProductPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
