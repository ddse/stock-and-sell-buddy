import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pos" element={<POS />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            {/* Placeholder routes for remaining pages */}
            <Route path="due-payments" element={<div className="p-6"><h1 className="text-3xl font-bold">Due Payments</h1></div>} />
            <Route path="settle-due" element={<div className="p-6"><h1 className="text-3xl font-bold">Settle Due Amount</h1></div>} />
            <Route path="transactions" element={<div className="p-6"><h1 className="text-3xl font-bold">Transactions</h1></div>} />
            <Route path="categories" element={<div className="p-6"><h1 className="text-3xl font-bold">Categories</h1></div>} />
            <Route path="unit-types" element={<div className="p-6"><h1 className="text-3xl font-bold">Unit Types</h1></div>} />
            <Route path="employees" element={<div className="p-6"><h1 className="text-3xl font-bold">Employee</h1></div>} />
            <Route path="salary" element={<div className="p-6"><h1 className="text-3xl font-bold">Salary</h1></div>} />
            <Route path="expenses" element={<div className="p-6"><h1 className="text-3xl font-bold">Expenses</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-3xl font-bold">Settings</h1></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
