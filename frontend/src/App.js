import { useState } from 'react';
import './App.css';
import './index.css';
import Addcard from './Addcard';
import { CartProvider } from './Carddetails';
import Payment from './Payment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'flowbite';
import Showdetails from './Showdetails';
import Web from './Web';
import Orderlist from './Orderlist';
import Login from './Login';
import Newuser from './Newuser';
import Product from './Product';

// ✔ FIXED IMPORT
import { ProductProvider } from './ProductContext';

function App() {
  let [p, setp] = useState(false);
  const [materials, setmaterials] = useState(false);

  return (
    <CartProvider>
      <ProductProvider>

        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>

              <Route path="/" element={<Web setp={setp} p={p} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Newuser />} />
              <Route path="/addcard" element={<Addcard />} />
              <Route path="/payment" element={<Payment />} />

              <Route
                path="/product/:id"
                element={
                  <Showdetails
                    materials={materials}
                    setmaterials={setmaterials}
                    setp={setp}
                    p={p}
                  />
                }
              />

              <Route path="/orderlist" element={<Orderlist />} />

              {/* product list page */}
              <Route path="/products" element={<Product selectedFilters={{}} />} />

            </Routes>
          </div>
        </Router>

      </ProductProvider>
    </CartProvider>
  );
}

export default App;
