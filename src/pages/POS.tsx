import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: "1", name: "iPhone 14 Pro", price: 999, category: "Electronics", stock: 15 },
    { id: "2", name: "Samsung Galaxy S23", price: 899, category: "Electronics", stock: 8 },
    { id: "3", name: "MacBook Air M2", price: 1299, category: "Computers", stock: 5 },
    { id: "4", name: "iPad Pro", price: 799, category: "Tablets", stock: 12 },
    { id: "5", name: "AirPods Pro", price: 249, category: "Accessories", stock: 25 },
    { id: "6", name: "Apple Watch Series 9", price: 399, category: "Wearables", stock: 18 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity === 0
          ? null
          : { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
            <p className="text-muted-foreground">Select products to add to cart</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground">Image</span>
                  </div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                      {product.stock} in stock
                    </Badge>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3"
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Current Order
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">Cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px]">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 mt-4">
                    <Button className="w-full" size="lg">
                      Process Payment
                    </Button>
                    <Button variant="outline" className="w-full" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}