import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import NotFound from "@/pages/not-found";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </CartProvider>
  );
}

export default App;
