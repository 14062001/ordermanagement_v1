import React, { Component } from "react";
import Navbar from "./Navbar";
import "./ViewProduct.css";
import axios from "axios";
import output from "./cloth.jpeg";
import {
  FaApplePay,
  FaDeskpro,
  FaLocationArrow,
  FaMobile,
  FaPhone,
  FaRProject,
  FaTable,
  FaTeamspeak,
  FaUser,
  FaUserTimes,
  FaVoicemail,
} from "react-icons/fa";
export default class ViewProduct extends Component {
  constructor(props) {
    super(props);
    const current = new Date();
    const date = `${current.getFullYear()}/${
      current.getMonth() + 1
    }/${current.getDate()}`;
    var d = new Date(date);
    this.state = {
      order_id: "",
      product_id: "",
      product_name: sessionStorage.getItem("setprodname"),
      product_details: "",
      product_price: "",
      status: "Pending",
      order_details: "Pending",
      quantity: "1",
      order_date: d,
      shipment_date: d,
      payment_method: "Online",
      total_price: "",
    };
    this.addtocart = this.addtocart.bind(this);
  }
  updateOrderId(product_id, order_id) {
    // alert("order_id updated in product");
    sessionStorage.setItem("productid", product_id);
    let url_p =
      "http://localhost:61891/api/Product/updateorder/" +
      sessionStorage.getItem("productid");
    axios
      .put(url_p, {
        order_id: order_id,
      })
      .then((response) => {
        sessionStorage.setItem("orderid", order_id);
        alert("Order_id updated" + response.data);
      })
      .catch((error) => {
        sessionStorage.setItem("orderid", order_id);
        alert(
          "product id" +
            sessionStorage.getItem("productid") +
            "error in update order id " +
            error
        );
      });
  }
  updateOrder(order_id, product_price) {
    alert(order_id);
    let url = "http://localhost:61891/updateorder/" + order_id;
    axios
      .put(url, {
        status: this.state.status,
        quantity: parseInt(sessionStorage.getItem("setquantity")) + 1,
        total_Price:
          parseInt(sessionStorage.getItem("settotalprice")) +
          parseInt(product_price),
      })
      .then((response) => {
        sessionStorage.setItem("setquantity", response.data.quantity);
        sessionStorage.setItem("settotalprice", response.data.total_Price);
        alert("updated quantity" + sessionStorage.getItem("setquantity"));
        alert("updated price" + sessionStorage.getItem("settotalprice"));
      })
      .catch((error) => {
        alert(
          "product id" +
            sessionStorage.getItem("productid") +
            "order id" +
            sessionStorage.getItem("orderid") +
            "error in update order  " +
            error
        );
      });
  }
  addtocart() {
    // alert("product id" + sessionStorage.getItem("prodid"));
    alert("Order id from view product" + sessionStorage.getItem("orderid"));
    if (sessionStorage.getItem("orderid") == null) {
      // this.state.total_price = sessionStorage.getItem("prodprice");
      alert("This is first product you have added");
      let url = "http://localhost:61891/AddnewOrder";
      axios
        .post(url, {
          status: this.state.status,
          order_details: this.state.order_details,
          quantity: this.state.quantity,
          order_date: this.state.order_date,
          shipment_date: this.state.shipment_date,
          payment_method: this.state.payment_method,
          total_Price: sessionStorage.getItem("prodprice"),
        })
        .then((response) => {
          sessionStorage.setItem("orderid", response.data);
          sessionStorage.setItem("setquantity", this.state.quantity);
          sessionStorage.setItem("settotalprice", this.state.product_price);
          alert(
            "First product price" + sessionStorage.getItem("settotalprice")
          );
          this.state.order_id = sessionStorage.getItem("orderid");
          window.location = "/viewallproducts";
          this.updateOrderId(
            sessionStorage.getItem("prodid"),
            this.state.order_id
          );
        })
        .catch((error) => {
          alert("error in add to cart from view prod" + error);
        });
    } else {
      alert("New product added into cart");

      this.updateOrderId(sessionStorage.getItem("prodid"), this.state.order_id);
      this.updateOrder(
        this.state.order_id,
        sessionStorage.getItem("prodprice")
      );
      window.location = "/viewallproducts";
    }
  }
  componentDidMount() {
    let setprodname = sessionStorage.getItem("setprodname");
    let url = "http://localhost:61891/api/Product/productview/" + setprodname;
    axios
      .get(url)
      .then((res) => res)
      .then((response) => {
        this.state.product_id = response.data.product_id;
        this.setState({
          product_id: response.data.product_id,
          product_name: response.data.product_name,
          product_details: response.data.product_details,
          product_price: response.data.product_price,
        });
        sessionStorage.setItem("prodid", this.state.product_id);
        sessionStorage.setItem("prodprice", this.state.product_price);
        //alert(sessionStorage.getItem("prodprice"));
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <div class="container emp-profile">
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <img className="imgc" src={output} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <h1 class="forh1">
                  <u>Product Details</u>
                </h1>
                <h5>{this.state.product_name}</h5>
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-work">
                <p>Contact Details</p>
                <FaUser className="sidebarIcon" />
                <a href=""> ShopNow</a>
                <br />
                <FaPhone className="sidebarIcon" />
                <a href=""> +91 9834428222</a>
                <br />
                <FaLocationArrow className="sidebarIcon" />
                <a href=""> India|Chennai</a>
                <br></br>
                <br></br>
              </div>
            </div>
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.product_name}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Details</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.product_details}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Price</label>
                    </div>
                    <div class="col-md-6">
                      <p>₹{this.state.product_price}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Available offers</label>
                    </div>

                    <p className="offer">
                      <i class="fa fa-check icon"></i>
                      Special PriceGet extra 38% off (price inclusive of
                      cashback/coupon)T&C
                    </p>

                    <p className="offer">
                      <i class="fa fa-check icon"></i>
                      Bank Offer10% off on SBI Credit Card, up to ₹1,750, on
                      orders of ₹5000 and aboveT&C
                    </p>

                    <p className="offer">
                      <i class="fa fa-check icon"></i>
                      Bank Offer10% off on SBI Credit Card EMI Transactions, up
                      to ₹2,250, on orders of ₹5000 and aboveT&C
                    </p>

                    <p className="offer">
                      <i class="fa fa-check icon"></i>
                      Bank OfferAdditional ₹750 discount on SBI Credit Card and
                      EMI txns on net cart value of INR 29,999 and aboveT&C
                    </p>
                  </div>

                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
