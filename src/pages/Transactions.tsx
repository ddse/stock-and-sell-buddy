import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign, Receipt } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "Sale" | "Purchase" | "Payment" | "Refund" | "Expense";
  description: string;
  customer?: string;
  supplier?: string;
  amount: number;
  method: "Cash" | "Card" | "Bank Transfer" | "Check";
  status: "Completed" | "Pending" | "Failed";
  reference?: string;
}

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      date: "2024-01-30",
      type: "Sale",
      description: "iPhone 14 Pro sale to John Doe",
      customer: "John Doe",
      amount: 1200.00,
      method: "Card",
      status: "Completed",
      reference: "ORD-001"
    },
    {
      id: "TXN-002",
      date: "2024-01-30",
      type: "Payment",
      description: "Payment received from Jane Smith",
      customer: "Jane Smith",
      amount: 850.00,
      method: "Bank Transfer",
      status: "Completed",
      reference: "DUE-002"
    },
    {
      id: "TXN-003",
      date: "2024-01-29",
      type: "Purchase",
      description: "Inventory purchase from TechSupply Co.",
      supplier: "TechSupply Co.",
      amount: -5000.00,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PUR-001"
    },
    {
      id: "TXN-004",
      date: "2024-01-29",
      type: "Expense",
      description: "Office rent payment",
      amount: -2500.00,
      method: "Bank Transfer",
      status: "Completed"
    },
    {
      id: "TXN-005",
      date: "2024-01-28",
      type: "Refund",
      description: "Refund to Mike Johnson",
      customer: "Mike Johnson",
      amount: -320.00,
      method: "Cash",
      status: "Completed",
      reference: "ORD-003"
    },
    {
      id: "TXN-006",
      date: "2024-01-28",
      type: "Sale",
      description: "MacBook Air sale",
      customer: "Sarah Wilson",
      amount: 1500.00,
      method: "Card",
      status: "Pending"
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.customer && transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transaction.supplier && transaction.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeVariant = (type: Transaction["type"]) => {
    switch (type) {
      case "Sale":
        return "default";
      case "Payment":
        return "secondary";
      case "Purchase":
        return "outline";
      case "Expense":
        return "destructive";
      case "Refund":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusVariant = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Pending":
        return "secondary";
      case "Failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const totalIncome = transactions
    .filter(t => t.amount > 0 && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.amount < 0 && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0));
  
  const netIncome = totalIncome - totalExpenses;
  const totalTransactions = transactions.filter(t => t.status === "Completed").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage all financial transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From sales & payments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Purchases & expenses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${netIncome.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Income - Expenses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Sale">Sale</SelectItem>
            <SelectItem value="Purchase">Purchase</SelectItem>
            <SelectItem value="Payment">Payment</SelectItem>
            <SelectItem value="Refund">Refund</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.customer || transaction.supplier || "-"}</TableCell>
                  <TableCell>
                    <span className={transaction.amount >= 0 ? "text-success" : "text-destructive"}>
                      {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.reference || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}