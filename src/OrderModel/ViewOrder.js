import React, { Component } from "react";
import Navbar from "../ProductModel/Navbar";
import axios from "axios";
export default class ViewOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      status: "",
      order_details: "",
      quantity: "",
      order_date: "",
      shipment_date: "",
      payment_method: "",
      total_Price: "",
    };
  }
  componentDidMount() {
    let oi = sessionStorage.getItem("orderidforview");
    let url = "http://localhost:61891/orderbyid/" + oi;
    axios
      .get(url)
      .then((res) => res)
      .then((response) => {
        this.state.order_id = response.data.order_id;
        this.setState({
          status: response.data.status,
          order_details: response.data.order_details,
          quantity: response.data.quantity,
          order_date: response.data.order_date,
          shipment_date: response.data.shipment_date,
          payment_method: response.data.payment_method,
          total_Price: response.data.total_Price,
        });
        //sessionStorage.setItem("prodid", this.state.product_id);
        // sessionStorage.setItem("prodprice", this.state.product_price);
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
            <div class="col-md-6">
              <div class="profile-head">
                <h1 class="forh1">
                  <u>Order Details</u>
                </h1>
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>
          <div class="row">
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
                      <label>Order Reference no</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.order_id}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Status</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.status}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Details</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.order_details}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Quantity</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.quantity}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Order date</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.order_date}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Shippment date</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.shipment_date}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Payment method</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.payment_method}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Total price</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.total_Price}</p>
                    </div>
                  </div>
                  <br></br>
                  <a href="/myorders">Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
