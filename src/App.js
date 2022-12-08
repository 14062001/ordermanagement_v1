import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./CustomerModel/CustomerLogin";
import ViewAllProducts from "./ProductModel/ViewAllProducts";
import ViewCart from "./ProductModel/ViewCart";
import EnterEmail from "./ProductModel/EnterEmail";
import ViewProduct from "./ProductModel/ViewProduct";
import MyOrders from "./OrderModel/MyOrders";
import ViewOrder from "./OrderModel/ViewOrder";
import ChangeAddress from "./OrderModel/ChangeAddress";
import ChoosePaymentMethod from "./OrderModel/ChoosePaymentMethod";
import OnlinePayment from "./OrderModel/OnlinePayment";
import CashOnDelivery from "./OrderModel/CashOnDelivery";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerLogin></CustomerLogin>} />
          <Route path="/viewallproducts" element={<ViewAllProducts />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/enteremail" element={<EnterEmail />} />
          <Route path="/viewproduct" element={<ViewProduct />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/vieworderdetail" element={<ViewOrder />} />
          <Route path="/changeaddress" element={<ChangeAddress />} />
          <Route
            path="/choosepaymentmethod"
            element={<ChoosePaymentMethod />}
          />
          <Route path="/onlinepayment" element={<OnlinePayment />} />
          <Route path="/cashondelivery" element={<CashOnDelivery />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
