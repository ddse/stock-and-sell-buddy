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
import { Search, Plus, Eye, DollarSign, Banknote, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  month: string;
  year: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
  overtime: number;
  netSalary: number;
  status: "Paid" | "Pending" | "Processing";
  paidDate?: string;
  notes?: string;
}

export default function Salary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SalaryRecord | null>(null);
  const { toast } = useToast();

  const salaryRecords: SalaryRecord[] = [
    {
      id: "SAL-001",
      employeeId: "EMP-001",
      employeeName: "Alice Johnson",
      position: "Store Manager",
      department: "Management",
      month: "January",
      year: 2024,
      baseSalary: 5416.67,
      bonus: 500.00,
      deductions: 200.00,
      overtime: 150.00,
      netSalary: 5866.67,
      status: "Paid",
      paidDate: "2024-01-31",
      notes: "Performance bonus included"
    },
    {
      id: "SAL-002",
      employeeId: "EMP-002",
      employeeName: "Bob Smith",
      position: "Sales Associate",
      department: "Sales",
      month: "January",
      year: 2024,
      baseSalary: 2916.67,
      bonus: 200.00,
      deductions: 100.00,
      overtime: 75.00,
      netSalary: 3091.67,
      status: "Paid",
      paidDate: "2024-01-31"
    },
    {
      id: "SAL-003",
      employeeId: "EMP-003",
      employeeName: "Carol Davis",
      position: "Inventory Specialist",
      department: "Operations",
      month: "January",
      year: 2024,
      baseSalary: 3333.33,
      bonus: 0.00,
      deductions: 120.00,
      overtime: 100.00,
      netSalary: 3313.33,
      status: "Paid",
      paidDate: "2024-01-31"
    },
    {
      id: "SAL-004",
      employeeId: "EMP-004",
      employeeName: "David Wilson",
      position: "Cashier",
      department: "Sales",
      month: "January",
      year: 2024,
      baseSalary: 2500.00,
      bonus: 0.00,
      deductions: 90.00,
      overtime: 50.00,
      netSalary: 2460.00,
      status: "Processing",
      notes: "On leave for part of month"
    },
    {
      id: "SAL-005",
      employeeId: "EMP-005",
      employeeName: "Eva Brown",
      position: "Assistant Manager",
      department: "Management",
      month: "February",
      year: 2024,
      baseSalary: 4166.67,
      bonus: 300.00,
      deductions: 150.00,
      overtime: 0.00,
      netSalary: 4316.67,
      status: "Pending"
    },
  ];

  const filteredRecords = salaryRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonth = monthFilter === "all" || record.month === monthFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const handleViewDetails = (record: SalaryRecord) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing Started",
      description: "Processing payroll for all pending salary records",
    });
  };

  const handleProcessPayment = (record: SalaryRecord) => {
    toast({
      title: "Payment Processed",
      description: `Payment processed for ${record.employeeName} - $${record.netSalary.toFixed(2)}`,
    });
    setIsDialogOpen(false);
  };

  const getStatusVariant = (status: SalaryRecord["status"]) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Processing":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const totalPaid = salaryRecords
    .filter(r => r.status === "Paid")
    .reduce((sum, r) => sum + r.netSalary, 0);
  
  const totalPending = salaryRecords
    .filter(r => r.status === "Pending")
    .reduce((sum, r) => sum + r.netSalary, 0);
  
  const paidRecords = salaryRecords.filter(r => r.status === "Paid").length;
  const pendingRecords = salaryRecords.filter(r => r.status === "Pending").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Salary Management</h1>
          <p className="text-muted-foreground">Manage employee salaries and payroll</p>
        </div>
        <Button onClick={handleProcessPayroll}>
          <Plus className="h-4 w-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{paidRecords} payments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{pendingRecords} pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Monthly Salary</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${salaryRecords.length > 0 ? (salaryRecords.reduce((sum, r) => sum + r.baseSalary, 0) / salaryRecords.length).toFixed(0) : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Base salary average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salaryRecords.filter(r => r.month === "February" && r.year === 2024).length}
            </div>
            <p className="text-xs text-muted-foreground">Salary records</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            <SelectItem value="January">January</SelectItem>
            <SelectItem value="February">February</SelectItem>
            <SelectItem value="March">March</SelectItem>
            <SelectItem value="April">April</SelectItem>
            <SelectItem value="May">May</SelectItem>
            <SelectItem value="June">June</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Salary Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{record.position}</div>
                      <div className="text-sm text-muted-foreground">{record.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.month} {record.year}</TableCell>
                  <TableCell>${record.baseSalary.toFixed(2)}</TableCell>
                  <TableCell>
                    {record.bonus > 0 ? (
                      <span className="text-success">+${record.bonus.toFixed(2)}</span>
                    ) : (
                      <span className="text-muted-foreground">$0.00</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.deductions > 0 ? (
                      <span className="text-destructive">-${record.deductions.toFixed(2)}</span>
                    ) : (
                      <span className="text-muted-foreground">$0.00</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">${record.netSalary.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(record)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Salary Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Salary Details</DialogTitle>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="space-y-6">
              {/* Employee Info */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {selectedRecord.employeeName}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employee ID:</span> {selectedRecord.employeeId}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Position:</span> {selectedRecord.position}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Department:</span> {selectedRecord.department}
                  </div>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div>
                <h3 className="font-semibold mb-2">Salary Breakdown - {selectedRecord.month} {selectedRecord.year}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Base Salary</span>
                    <span className="font-medium">${selectedRecord.baseSalary.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Overtime</span>
                    <span className="font-medium text-success">+${selectedRecord.overtime.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Bonus</span>
                    <span className="font-medium text-success">+${selectedRecord.bonus.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Deductions</span>
                    <span className="font-medium text-destructive">-${selectedRecord.deductions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-muted/50 px-3 rounded">
                    <span className="font-semibold">Net Salary</span>
                    <span className="font-bold text-lg">${selectedRecord.netSalary.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <h3 className="font-semibold mb-2">Payment Status</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={getStatusVariant(selectedRecord.status)}>
                    {selectedRecord.status}
                  </Badge>
                  {selectedRecord.paidDate && (
                    <span className="text-sm text-muted-foreground">
                      Paid on {new Date(selectedRecord.paidDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {selectedRecord.notes && (
                  <div className="mt-2">
                    <Label>Notes:</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRecord.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                {selectedRecord.status === "Pending" && (
                  <Button onClick={() => handleProcessPayment(selectedRecord)}>Process Payment</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}