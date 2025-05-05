
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { 
  Users, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Truck,
  SearchIcon,
  Edit,
  Save,
  FileEdit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Order } from '@/context/ProductContext';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { orders, updateOrderStatus, updateOrderPrice } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState<number | null>(null);
  
  // Redirect if not logged in or not admin
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/customer/dashboard" />;
  }
  
  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get the status counts
  const statusCounts = {
    requested: orders.filter(order => order.status === 'requested').length,
    approved: orders.filter(order => order.status === 'approved').length,
    rejected: orders.filter(order => order.status === 'rejected').length,
  };
  
  const handleStatusChange = (orderId: string, status: 'requested' | 'approved' | 'rejected') => {
    updateOrderStatus(orderId, status);
    
    const statusMessages = {
      requested: 'Order marked as requested',
      approved: 'Order approved successfully',
      rejected: 'Order rejected',
    };
    
    toast.success(statusMessages[status]);
  };
  
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
    setEditedPrice(null);
    setIsEditingPrice(false);
  };

  const startPriceEdit = () => {
    if (selectedOrder) {
      setEditedPrice(selectedOrder.total);
      setIsEditingPrice(true);
    }
  };

  const savePriceEdit = () => {
    if (selectedOrder && editedPrice !== null) {
      updateOrderPrice(selectedOrder.id, editedPrice);
      setIsEditingPrice(false);
      setSelectedOrder({
        ...selectedOrder,
        originalTotal: selectedOrder.originalTotal || selectedOrder.total,
        total: editedPrice
      });
      toast.success('Order price updated successfully');
    }
  };

  const cancelPriceEdit = () => {
    setIsEditingPrice(false);
    setEditedPrice(null);
  };

  const calculateDiscountPercentage = (order: Order) => {
    if (!order.originalTotal) return 0;
    const discount = order.originalTotal - order.total;
    return Math.round((discount / order.originalTotal) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-steelblue-900">Admin Dashboard</h1>
      
      {/* Admin Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/admin/dashboard">
            <Package className="h-4 w-4" />
            Orders
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/admin/products">
            <FileEdit className="h-4 w-4" />
            Products Management
          </Link>
        </Button>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-steelgray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-steelblue-600" />
              <span className="text-3xl font-bold text-steelblue-900">{orders.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-steelgray-500">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="text-3xl font-bold text-amber-500">{statusCounts.requested}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-steelgray-500">Approved Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-3xl font-bold text-green-600">{statusCounts.approved}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-steelgray-500">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-steelblue-600" />
              <span className="text-3xl font-bold text-steelblue-900">1</span> {/* Hardcoded for demo */}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Orders Management */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-steelblue-900 mb-4">Orders Management</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steelgray-400 h-4 w-4" />
              <Input
                placeholder="Search by order ID or customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-steelgray-400 mx-auto mb-4" />
            <p className="text-steelgray-500 font-medium">No orders found with the current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                    <TableCell>{order.userName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                        <span className="text-xs text-steelgray-500">
                          {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{order.items.length}</span>
                        <span className="text-xs text-steelgray-500">
                          ({order.items.reduce((sum, item) => sum + item.quantity, 0)} units)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        ₹{order.total.toFixed(2)}
                        {order.originalTotal && order.originalTotal > order.total && (
                          <div className="text-xs text-green-600">
                            {calculateDiscountPercentage(order)}% discount
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === 'approved'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : order.status === 'rejected'
                            ? 'bg-red-100 text-red-800 hover:bg-red-100'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                        }
                      >
                        {order.status === 'approved' && (
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        )}
                        {order.status === 'rejected' && (
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                        )}
                        {order.status === 'requested' && (
                          <Clock className="h-3.5 w-3.5 mr-1" />
                        )}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        View
                      </Button>
                      
                      {order.status === 'requested' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-500 hover:bg-green-50"
                          onClick={() => handleStatusChange(order.id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      
                      {order.status === 'requested' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => handleStatusChange(order.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      )}
                      
                      {order.status === 'approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-500 text-amber-500 hover:bg-amber-50"
                          onClick={() => handleStatusChange(order.id, 'requested')}
                        >
                          Reset
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id.slice(0, 8)} | Customer: {selectedOrder?.userName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="mt-4">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-steelgray-500">
                    Ordered on {new Date(selectedOrder.date).toLocaleDateString()} 
                    ({formatDistanceToNow(new Date(selectedOrder.date), { addSuffix: true })})
                  </p>
                </div>
                <Badge
                  className={
                    selectedOrder.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : selectedOrder.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }
                >
                  {selectedOrder.status === 'approved' && (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  {selectedOrder.status === 'rejected' && (
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                  )}
                  {selectedOrder.status === 'requested' && (
                    <Clock className="h-3.5 w-3.5 mr-1" />
                  )}
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name}
                                className="object-contain w-full h-full p-2"
                              />
                            </div>
                            <span>{item.product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.product.subcategory}</TableCell>
                        <TableCell className="text-right">
                          ₹{item.product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-steelgray-500">Total Items:</span>
                    <span className="font-medium">
                      {selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  
                  {selectedOrder.originalTotal && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-steelgray-500">Original Total:</span>
                      <span className="font-medium line-through text-steelgray-500">
                        ₹{selectedOrder.originalTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2 border-b items-center">
                    <span className="text-steelgray-500">
                      {isEditingPrice ? 'New Total:' : 'Subtotal:'}
                    </span>
                    
                    {isEditingPrice ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editedPrice !== null ? editedPrice : selectedOrder.total}
                          onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                          className="w-28 text-right"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{selectedOrder.total.toFixed(2)}</span>
                        {selectedOrder.status === 'requested' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={startPriceEdit} 
                            className="h-6 w-6 rounded-full"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {selectedOrder.originalTotal && selectedOrder.originalTotal > selectedOrder.total && (
                    <div className="flex justify-between py-2 border-b text-green-600">
                      <span>Discount:</span>
                      <span>
                        {calculateDiscountPercentage(selectedOrder)}%
                        (₹{(selectedOrder.originalTotal - selectedOrder.total).toFixed(2)})
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2 text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{isEditingPrice && editedPrice !== null ? editedPrice.toFixed(2) : selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {isEditingPrice && (
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={cancelPriceEdit}>
                    Cancel
                  </Button>
                  <Button onClick={savePriceEdit}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Price
                  </Button>
                </div>
              )}
              
              {selectedOrder.status === 'requested' && !isEditingPrice && (
                <div className="mt-6 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'rejected');
                      setShowOrderDetails(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Order
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'approved');
                      setShowOrderDetails(false);
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve Order
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
