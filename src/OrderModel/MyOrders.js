import React, { Component } from "react";
import Navbar from "../ProductModel/Navbar";
import axios from "axios";
export default class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
    this.orderconfirm = this.orderconfirm.bind();
  }
  orderconfirm(orderid, q, p) {
    alert("Confirm Order!!!!" + orderid + " " + q + " " + p);
    let url = "http://localhost:61891/updateorder/" + orderid;
    axios
      .put(url, {
        status: "Confirmed",
        quantity: q,
        total_Price: p,
      })
      .then((response) => {
        alert("Order Confirmed...Order will be shipped in few days");
        sessionStorage.setItem("orderid", orderid);
        window.location = "/changeaddress";
        sessionStorage.setItem("status", "Confirmed");
      })
      .catch((error) => {
        console.log(error);
        alert("order confirm error" + error);
      });
  }
  ordercancle(orderid, q, p) {
    alert("Do you want to cancel order?");
    let url = "http://localhost:61891/updateorder/" + orderid;
    axios
      .put(url, {
        status: "Cancelled",
        quantity: q,
        total_Price: p,
      })
      .then((response) => {
        alert("Order Cancelled");
        window.location = "/enteremail";
        sessionStorage.setItem("status", "Cancelled");
      })
      .catch((error) => {
        alert(error);
      });
  }
  viewdetails(orderid) {
    sessionStorage.setItem("orderidforview", orderid);
    window.location = "/vieworderdetail";
  }
  componentDidMount() {
    if (sessionStorage.getItem("username" == null)) {
      alert("Please Login first");
      window.location = "/";
    } else {
      let url = "http://localhost:61891/orderbystatus";
      axios
        .get(url)
        .then((res) => res)
        .then((response) => {
          //
          this.setState({ orders: response.data });
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }

  render() {
    const { orders } = this.state;
    return (
      <>
        <Navbar></Navbar>
        <div className="heading">
          <h1> My Orders </h1>
        </div>
        <div>
          <table id="tab">
            <thead>
              <tr>
                <th>Reference no.</th>
                <th> Status</th> <th> Qantity </th>
                <th>Total Price </th> <th>Confirm Order</th>
                <th>Cancle Order</th>
                <th> View Details </th>
              </tr>
            </thead>
            {orders.map((a) => (
              <tr>
                <td>{a.order_id}</td>
                <td> {a.status} </td> <td> {a.quantity} </td>
                <td> {a.total_Price} </td>
                <td>
                  <button
                    onClick={this.orderconfirm.bind(
                      this,
                      a.order_id,
                      a.quantity,
                      a.total_Price
                    )}
                  >
                    Confirm
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.ordercancle.bind(
                      this,
                      a.order_id,
                      a.quantity,
                      a.total_Price
                    )}
                  >
                    Cancle
                  </button>
                </td>
                <td>
                  <button onClick={this.viewdetails.bind(this, a.order_id)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }
}
