import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, Calculator, TrendingDown, Calendar, Receipt } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: "Cash" | "Bank Transfer" | "Credit Card" | "Check";
  vendor?: string;
  description: string;
  status: "Paid" | "Pending" | "Approved";
  receiptUrl?: string;
  approvedBy?: string;
}

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    vendor: "",
    description: "",
    paymentMethod: "",
    status: "Pending" as "Paid" | "Pending" | "Approved"
  });

  const expenses: Expense[] = [
    {
      id: "EXP-001",
      title: "Office Rent",
      category: "Rent & Utilities",
      amount: 2500.00,
      date: "2024-01-01",
      paymentMethod: "Bank Transfer",
      vendor: "City Properties LLC",
      description: "Monthly office rent payment",
      status: "Paid",
      approvedBy: "Alice Johnson"
    },
    {
      id: "EXP-002",
      title: "Internet & Phone",
      category: "Utilities",
      amount: 150.00,
      date: "2024-01-05",
      paymentMethod: "Credit Card",
      vendor: "TechComm Solutions",
      description: "Monthly internet and phone services",
      status: "Paid",
      approvedBy: "Alice Johnson"
    },
    {
      id: "EXP-003",
      title: "Office Supplies",
      category: "Office Supplies",
      amount: 320.00,
      date: "2024-01-10",
      paymentMethod: "Credit Card",
      vendor: "Office Depot",
      description: "Stationery, printer paper, and office materials",
      status: "Paid",
      approvedBy: "Eva Brown"
    },
    {
      id: "EXP-004",
      title: "Inventory Software License",
      category: "Software & Technology",
      amount: 450.00,
      date: "2024-01-15",
      paymentMethod: "Bank Transfer",
      vendor: "SoftTech Inc.",
      description: "Annual software license renewal",
      status: "Approved",
      approvedBy: "Alice Johnson"
    },
    {
      id: "EXP-005",
      title: "Marketing Materials",
      category: "Marketing",
      amount: 800.00,
      date: "2024-01-20",
      paymentMethod: "Credit Card",
      vendor: "Print Plus",
      description: "Brochures, business cards, and promotional materials",
      status: "Pending"
    },
    {
      id: "EXP-006",
      title: "Employee Training",
      category: "Training & Development",
      amount: 1200.00,
      date: "2024-01-25",
      paymentMethod: "Bank Transfer",
      vendor: "Training Academy",
      description: "Sales training workshop for team",
      status: "Approved",
      approvedBy: "Alice Johnson"
    },
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSaveExpense = () => {
    if (formData.title.trim() && formData.amount.trim()) {
      // Handle save logic here
      console.log("Saving expense:", formData);
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        amount: "",
        vendor: "",
        description: "",
        paymentMethod: "",
        status: "Pending"
      });
      setEditingExpense(null);
      setIsDialogOpen(false);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      category: expense.category,
      amount: expense.amount.toString(),
      vendor: expense.vendor || "",
      description: expense.description,
      paymentMethod: expense.paymentMethod,
      status: expense.status
    });
    setIsDialogOpen(true);
  };

  const handleNewExpense = () => {
    setEditingExpense(null);
    setFormData({
      title: "",
      category: "",
      amount: "",
      vendor: "",
      description: "",
      paymentMethod: "",
      status: "Pending"
    });
    setIsDialogOpen(true);
  };

  const getStatusVariant = (status: Expense["status"]) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Approved":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === "Paid").reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === "Pending").reduce((sum, e) => sum + e.amount, 0);
  const thisMonthExpenses = expenses
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  const categories = Array.from(new Set(expenses.map(e => e.category)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground">Track and manage business expenses</p>
        </div>
        <Button onClick={handleNewExpense}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${paidExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Already paid</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current month expenses</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{expense.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-48">
                        {expense.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.vendor || "-"}</TableCell>
                  <TableCell className="font-medium text-destructive">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(expense.status)}>
                      {expense.status}
                    </Badge>
                    {expense.approvedBy && (
                      <div className="text-xs text-muted-foreground mt-1">
                        by {expense.approvedBy}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditExpense(expense)}
                      >
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

      {/* Add/Edit Expense Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Expense Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter expense title"
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rent & Utilities">Rent & Utilities</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Software & Technology">Software & Technology</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Training & Development">Training & Development</SelectItem>
                    <SelectItem value="Travel & Transportation">Travel & Transportation</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="vendor">Vendor/Supplier (Optional)</Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                placeholder="Enter vendor name"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter expense description"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveExpense}>
                {editingExpense ? "Update" : "Create"} Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}