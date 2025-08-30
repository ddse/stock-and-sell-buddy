import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, Package, Scale } from "lucide-react";

interface UnitType {
  id: string;
  name: string;
  symbol: string;
  description: string;
  baseUnit?: string;
  conversionFactor?: number;
  productCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
}

export default function UnitTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<UnitType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    baseUnit: "",
    conversionFactor: "",
    status: "Active" as "Active" | "Inactive"
  });

  const unitTypes: UnitType[] = [
    {
      id: "UNIT-001",
      name: "Piece",
      symbol: "pcs",
      description: "Individual items or units",
      productCount: 45,
      status: "Active",
      createdAt: "2024-01-15"
    },
    {
      id: "UNIT-002",
      name: "Kilogram",
      symbol: "kg",
      description: "Weight measurement in kilograms",
      productCount: 12,
      status: "Active",
      createdAt: "2024-01-16"
    },
    {
      id: "UNIT-003",
      name: "Gram",
      symbol: "g",
      description: "Weight measurement in grams",
      baseUnit: "kg",
      conversionFactor: 0.001,
      productCount: 8,
      status: "Active",
      createdAt: "2024-01-17"
    },
    {
      id: "UNIT-004",
      name: "Liter",
      symbol: "L",
      description: "Volume measurement in liters",
      productCount: 6,
      status: "Active",
      createdAt: "2024-01-18"
    },
    {
      id: "UNIT-005",
      name: "Milliliter",
      symbol: "mL",
      description: "Volume measurement in milliliters",
      baseUnit: "L",
      conversionFactor: 0.001,
      productCount: 15,
      status: "Active",
      createdAt: "2024-01-19"
    },
    {
      id: "UNIT-006",
      name: "Meter",
      symbol: "m",
      description: "Length measurement in meters",
      productCount: 3,
      status: "Inactive",
      createdAt: "2024-01-20"
    },
  ];

  const filteredUnits = unitTypes.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUnit = () => {
    if (formData.name.trim() && formData.symbol.trim()) {
      // Handle save logic here
      console.log("Saving unit type:", formData);
      
      // Reset form
      setFormData({ 
        name: "", 
        symbol: "", 
        description: "", 
        baseUnit: "", 
        conversionFactor: "", 
        status: "Active" 
      });
      setEditingUnit(null);
      setIsDialogOpen(false);
    }
  };

  const handleEditUnit = (unit: UnitType) => {
    setEditingUnit(unit);
    setFormData({
      name: unit.name,
      symbol: unit.symbol,
      description: unit.description,
      baseUnit: unit.baseUnit || "",
      conversionFactor: unit.conversionFactor?.toString() || "",
      status: unit.status
    });
    setIsDialogOpen(true);
  };

  const handleNewUnit = () => {
    setEditingUnit(null);
    setFormData({ 
      name: "", 
      symbol: "", 
      description: "", 
      baseUnit: "", 
      conversionFactor: "", 
      status: "Active" 
    });
    setIsDialogOpen(true);
  };

  const totalUnits = unitTypes.length;
  const activeUnits = unitTypes.filter(u => u.status === "Active").length;
  const totalProducts = unitTypes.reduce((sum, u) => sum + u.productCount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Unit Types</h1>
          <p className="text-muted-foreground">Manage measurement units for your products</p>
        </div>
        <Button onClick={handleNewUnit}>
          <Plus className="h-4 w-4 mr-2" />
          Add Unit Type
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unit Types</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">All unit types</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Units</CardTitle>
            <Scale className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUnits}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Using Units</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Across all unit types</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search unit types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Unit Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Unit Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Base Unit</TableHead>
                <TableHead>Conversion Factor</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.id}</TableCell>
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {unit.symbol}
                    </Badge>
                  </TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>{unit.baseUnit || "-"}</TableCell>
                  <TableCell>{unit.conversionFactor || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {unit.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={unit.status === "Active" ? "default" : "secondary"}>
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditUnit(unit)}
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

      {/* Add/Edit Unit Type Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUnit ? "Edit Unit Type" : "Add New Unit Type"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Unit Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter unit name"
                />
              </div>
              
              <div>
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  value={formData.symbol}
                  onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                  placeholder="e.g., kg, pcs, L"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter unit description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseUnit">Base Unit (Optional)</Label>
                <Input
                  id="baseUnit"
                  value={formData.baseUnit}
                  onChange={(e) => setFormData({...formData, baseUnit: e.target.value})}
                  placeholder="e.g., kg for grams"
                />
              </div>
              
              <div>
                <Label htmlFor="conversionFactor">Conversion Factor</Label>
                <Input
                  id="conversionFactor"
                  type="number"
                  step="0.001"
                  value={formData.conversionFactor}
                  onChange={(e) => setFormData({...formData, conversionFactor: e.target.value})}
                  placeholder="e.g., 0.001 for g to kg"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUnit}>
                {editingUnit ? "Update" : "Create"} Unit Type
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}