
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, updateCartItem, removeFromCart, getCartTotal, clearCart, placeOrder } = useProducts();
  const navigate = useNavigate();
  
  // Redirect if not logged in or if admin
  if (!user) {
    return <Navigate to="/login?redirect=/cart" />;
  }
  
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartItem(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };
  
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    placeOrder(user.id, user.name);
    toast.success('Order placed successfully!', {
      description: 'Your order is pending approval. Check your dashboard for updates.',
    });
    navigate('/customer/dashboard');
  };
  
  const cartTotal = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-steelblue-900">Your Cart</h1>
        <Button variant="ghost" asChild>
          <Link to="/products" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </Button>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-steelgray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-steelblue-900 mb-2">Your cart is empty</h2>
          <p className="text-steelgray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-steelblue-900">Cart Items ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.productId} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="text-lg font-medium text-steelblue-900">{item.product.name}</h3>
                      <p className="text-steelgray-500 text-sm">{item.product.subcategory}</p>
                      <p className="text-steelblue-600 font-semibold mt-1">₹{item.product.price.toFixed(2)} per unit</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="w-24">
                        <label htmlFor={`quantity-${item.productId}`} className="sr-only">
                          Quantity
                        </label>
                        <Input
                          id={`quantity-${item.productId}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                          className="h-9"
                        />
                      </div>
                      
                      <div className="w-24 text-right">
                        <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-steelgray-500 hover:text-steelred-500"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-steelblue-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-steelgray-600">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span className="text-steelgray-600">Shipping</span>
                  <span className="font-medium">To be calculated</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-steelblue-900">Total</span>
                  <span className="text-lg font-semibold text-steelblue-900">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                className="w-full mt-6 flex items-center justify-center"
                onClick={handlePlaceOrder}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span>Place Order</span>
              </Button>
              
              <Button
                variant="outline"
                className="w-full mt-4 border-steelgray-300 text-steelgray-700"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              
              <p className="mt-6 text-sm text-steelgray-500">
                By placing an order, your request will be sent to our admin team for approval. 
                Once approved, we'll contact you regarding payment and delivery options.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
