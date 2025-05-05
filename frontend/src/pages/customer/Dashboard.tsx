
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { 
  Package2, 
  ShoppingBag, 
  Clock, 
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { formatDistanceToNow } from 'date-fns';

const CustomerDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { getOrdersByUser } = useProducts();
  
  // Redirect if not logged in or if admin
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  const orders = getOrdersByUser(user.id);

  // Get the status counts
  const statusCounts = {
    requested: orders.filter(order => order.status === 'requested').length,
    approved: orders.filter(order => order.status === 'approved').length,
    rejected: orders.filter(order => order.status === 'rejected').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-steelblue-900">Customer Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-steelgray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-steelblue-600" />
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
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-steelblue-900">Order History</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-8 text-center">
            <Package2 className="h-12 w-12 text-steelgray-400 mx-auto mb-4" />
            <p className="text-steelgray-500 font-medium mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
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
                    <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
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
                          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                        )}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
