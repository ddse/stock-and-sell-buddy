import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Phone, Mail, DollarSign, Calendar, AlertTriangle } from "lucide-react";

interface DuePayment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  daysPastDue: number;
  priority: "High" | "Medium" | "Low";
}

export default function DuePayments() {
  const [searchTerm, setSearchTerm] = useState("");

  const duePayments: DuePayment[] = [
    {
      id: "DUE-001",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      customerEmail: "john@example.com",
      totalAmount: 1500.00,
      paidAmount: 1000.00,
      dueAmount: 500.00,
      dueDate: "2024-01-10",
      daysPastDue: 20,
      priority: "High"
    },
    {
      id: "DUE-002",
      customerName: "Jane Smith",
      customerPhone: "+1234567891",
      customerEmail: "jane@example.com",
      totalAmount: 850.00,
      paidAmount: 500.00,
      dueAmount: 350.00,
      dueDate: "2024-01-25",
      daysPastDue: 5,
      priority: "Medium"
    },
    {
      id: "DUE-003",
      customerName: "Mike Johnson",
      customerPhone: "+1234567892",
      customerEmail: "mike@example.com",
      totalAmount: 2200.00,
      paidAmount: 1800.00,
      dueAmount: 400.00,
      dueDate: "2024-02-01",
      daysPastDue: 0,
      priority: "Low"
    },
  ];

  const filteredPayments = duePayments.filter(payment =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityVariant = (priority: DuePayment["priority"]) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  const totalDueAmount = duePayments.reduce((sum, payment) => sum + payment.dueAmount, 0);
  const highPriorityCount = duePayments.filter(p => p.priority === "High").length;
  const overdueCount = duePayments.filter(p => p.daysPastDue > 0).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Due Payments</h1>
        <p className="text-muted-foreground">Track and manage customer payments that are due</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Due Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDueAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Outstanding payments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">Urgent payments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Due Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Due Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Due Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3" />
                        {payment.customerPhone}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Mail className="h-3 w-3" />
                        {payment.customerEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${payment.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>${payment.paidAmount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium text-destructive">
                    ${payment.dueAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div>
                      {new Date(payment.dueDate).toLocaleDateString()}
                      {payment.daysPastDue > 0 && (
                        <div className="text-xs text-destructive">
                          {payment.daysPastDue} days overdue
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(payment.priority)}>
                      {payment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        Send Reminder
                      </Button>
                      <Button size="sm">
                        Collect Payment
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