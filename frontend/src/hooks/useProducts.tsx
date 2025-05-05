
import { useContext } from 'react';
import { ProductContext, ProductCategory } from '@/context/ProductContext';

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  const getProductsByCategory = (category: ProductCategory) => {
    return context.products.filter(product => product.category === category);
  };
  
  const getProductsBySubcategory = (subcategory: string) => {
    return context.products.filter(product => product.subcategory === subcategory);
  };
  
  const getCategoryProducts = () => {
    const categories = {
      'structural-materials': getProductsByCategory('structural-materials'),
      'steel-pipes': getProductsByCategory('steel-pipes'),
      'sheets-plates': getProductsByCategory('sheets-plates'),
    };
    
    return categories;
  };
  
  const getProductSubcategories = (category: ProductCategory) => {
    const products = getProductsByCategory(category);
    const subcategories = [...new Set(products.map(product => product.subcategory))];
    return subcategories;
  };
  
  const getCartTotal = () => {
    return context.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  };

  const getCartItemCount = () => {
    return context.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getOrdersByUser = (userId: string) => {
    return context.orders.filter(order => order.userId === userId);
  };

  return {
    ...context,
    getProductsByCategory,
    getProductsBySubcategory,
    getCategoryProducts,
    getProductSubcategories,
    getCartTotal,
    getCartItemCount,
    getOrdersByUser,
  };
};
