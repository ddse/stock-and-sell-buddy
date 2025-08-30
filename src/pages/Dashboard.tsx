import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Total Products",
      value: "2,350",
      change: "+180 this month",
      icon: Package,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "12,234",
      change: "+19% from last month",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Active Customers",
      value: "573",
      change: "+201 since last week",
      icon: Users,
      trend: "up",
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "$250.00", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", amount: "$185.00", status: "Pending" },
    { id: "ORD-003", customer: "Mike Johnson", amount: "$320.00", status: "Processing" },
    { id: "ORD-004", customer: "Sarah Wilson", amount: "$95.00", status: "Completed" },
  ];

  const lowStockProducts = [
    { name: "iPhone 14 Pro", stock: 5, minStock: 10 },
    { name: "Samsung Galaxy S23", stock: 3, minStock: 8 },
    { name: "MacBook Air M2", stock: 2, minStock: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "Processing"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Min: {product.minStock}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Chart Component Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Chart Component Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}