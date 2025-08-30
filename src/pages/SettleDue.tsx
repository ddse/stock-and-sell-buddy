import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, DollarSign, CreditCard, Banknote, Receipt } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalDue: number;
  orders: Array<{
    orderId: string;
    date: string;
    amount: number;
    dueAmount: number;
  }>;
}

export default function SettleDue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  const customers: Customer[] = [
    {
      id: "CUST-001",
      name: "John Doe",
      phone: "+1234567890",
      totalDue: 1250.00,
      orders: [
        { orderId: "ORD-001", date: "2024-01-15", amount: 750.00, dueAmount: 250.00 },
        { orderId: "ORD-005", date: "2024-01-20", amount: 1000.00, dueAmount: 1000.00 },
      ]
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      phone: "+1234567891",
      totalDue: 850.00,
      orders: [
        { orderId: "ORD-002", date: "2024-01-18", amount: 850.00, dueAmount: 850.00 },
      ]
    },
    {
      id: "CUST-003",
      name: "Mike Johnson",
      phone: "+1234567892",
      totalDue: 420.00,
      orders: [
        { orderId: "ORD-003", date: "2024-01-22", amount: 320.00, dueAmount: 320.00 },
        { orderId: "ORD-007", date: "2024-01-25", amount: 100.00, dueAmount: 100.00 },
      ]
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSettlePayment = () => {
    if (selectedCustomer && paymentAmount && paymentMethod) {
      // Handle payment settlement logic here
      console.log("Settling payment:", {
        customer: selectedCustomer.id,
        amount: parseFloat(paymentAmount),
        method: paymentMethod,
        notes
      });
      
      // Reset form
      setPaymentAmount("");
      setPaymentMethod("");
      setNotes("");
      setSelectedCustomer(null);
    }
  };

  const totalDueAmount = customers.reduce((sum, customer) => sum + customer.totalDue, 0);
  const customersWithDue = customers.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settle Due Amount</h1>
        <p className="text-muted-foreground">Process customer payments and settle outstanding dues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDueAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers with Due</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersWithDue}</div>
            <p className="text-xs text-muted-foreground">Need payment processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers with Outstanding Dues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Due</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      ${customer.totalDue.toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.orders.length} orders</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          Settle Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Settle Payment - {customer.name}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Customer Info */}
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Customer Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Name:</span> {customer.name}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone:</span> {customer.phone}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Total Due:</span> 
                                <span className="font-semibold text-destructive ml-1">
                                  ${customer.totalDue.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Outstanding Orders */}
                          <div>
                            <h3 className="font-semibold mb-2">Outstanding Orders</h3>
                            <div className="space-y-2">
                              {customer.orders.map((order) => (
                                <div key={order.orderId} className="flex justify-between items-center p-2 border rounded">
                                  <div>
                                    <span className="font-medium">{order.orderId}</span>
                                    <span className="text-muted-foreground text-sm ml-2">
                                      {new Date(order.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <span className="text-destructive font-medium">
                                    ${order.dueAmount.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Payment Form */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="amount">Payment Amount</Label>
                                <Input
                                  id="amount"
                                  type="number"
                                  placeholder="0.00"
                                  value={paymentAmount}
                                  onChange={(e) => setPaymentAmount(e.target.value)}
                                  max={customer.totalDue}
                                />
                              </div>
                              <div>
                                <Label htmlFor="method">Payment Method</Label>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select method" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cash">
                                      <div className="flex items-center gap-2">
                                        <Banknote className="h-4 w-4" />
                                        Cash
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="card">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Card
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="check">Check</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Payment notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button onClick={handleSettlePayment}>
                              Process Payment
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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