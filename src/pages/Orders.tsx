import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  items: number;
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      date: "2024-01-15",
      total: 1250.00,
      status: "Completed",
      items: 3
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      date: "2024-01-14",
      total: 850.00,
      status: "Processing",
      items: 2
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      date: "2024-01-14",
      total: 320.00,
      status: "Pending",
      items: 1
    },
    {
      id: "ORD-004",
      customerName: "Sarah Wilson",
      date: "2024-01-13",
      total: 1560.00,
      status: "Completed",
      items: 4
    },
    {
      id: "ORD-005",
      customerName: "David Brown",
      date: "2024-01-13",
      total: 95.00,
      status: "Cancelled",
      items: 1
    },
  ];

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Processing":
        return "secondary";
      case "Pending":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const totalRevenue = orders
    .filter(order => order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const processingOrders = orders.filter(order => order.status === "Processing").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage your customer orders</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingOrders}</div>
            <p className="text-xs text-muted-foreground">Currently being processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}