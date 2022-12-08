import React, { Component } from "react";
import "./ViewAllProducts.css";
import axios from "axios";
import output from "./cloth.jpeg";
import Navbar from "./Navbar";
export default class ViewAllProducts extends Component {
  constructor(props) {
    super(props);
    const current = new Date();
    const date = `${current.getFullYear()}/${
      current.getMonth() + 1
    }/${current.getDate()}`;
    var d = new Date(date);
    this.state = {
      products: [],
      order_id: "",
      status: "Pending",
      order_details:
        "Item should be opened and verified at the time of delivery.",
      quantity: "1",
      order_date: d,
      shipment_date: d,
      payment_method: "Online",
      total_price: "2900",
    };
    this.addtocart = this.addtocart.bind(this);
    //this.updateOrderId = this.updateOrderId.bind(this);
    //  this.updateOrder = this.updateOrder.bind(this);
    this.viewproduct = this.viewproduct.bind(this);
  }
  viewproduct(productname) {
    sessionStorage.setItem("setprodname", productname);
    window.location = "/viewproduct";
  }
  updateOrderId(product_id, order_id) {
    // alert("order_id updated in product");
    //alert("Your order reference id is " + order_id);
    sessionStorage.setItem("productid", product_id);
    let url_p =
      "http://localhost:61891/api/Product/updateorder/" +
      sessionStorage.getItem("productid");
    axios
      .put(url_p, {
        order_id: order_id,
      })
      .then((response) => {
        //  sessionStorage.setItem("orderid", order_id);
        // alert("Order_id updated" + response.data);
      })
      .catch((error) => {
        // sessionStorage.setItem("orderid", order_id);
        alert(
          "product id" +
            sessionStorage.getItem("productid") +
            "error in update order id " +
            error
        );
      });
  }
  updateOrder(order_id, product_price) {
    alert("Your order reference id is " + order_id);
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
        //alert("updated quantity" + sessionStorage.getItem("setquantity"));
        // alert("updated price" + sessionStorage.getItem("settotalprice"));
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
  addtocart(product_id, product_price) {
    //alert("product id" + product_id);

    // alert("Order id" + sessionStorage.getItem("orderid"));
    if (sessionStorage.getItem("orderid") == null) {
      alert("Product Sucessfully added to the cart");
      this.state.total_price = product_price;
      let url = "http://localhost:61891/AddnewOrder";
      axios
        .post(url, {
          status: this.state.status,
          order_details: this.state.order_details,
          quantity: this.state.quantity,
          order_date: this.state.order_date,
          shipment_date: this.state.shipment_date,
          payment_method: this.state.payment_method,
          total_Price: this.state.total_price,
        })
        .then((response) => {
          sessionStorage.setItem("orderid", response.data);
          sessionStorage.setItem("setquantity", this.state.quantity);
          sessionStorage.setItem("settotalprice", this.state.total_price);
          alert("Your order reference id is " + response.data);
          this.state.order_id = sessionStorage.getItem("orderid");
          this.updateOrderId(product_id, this.state.order_id);
          //this.updateOrder(this.state.order_id);
        })
        .catch((error) => {
          alert("error in add to cart" + error);
        });
    } else {
      alert("Product Sucessfully added to the cart");
      this.updateOrderId(product_id, sessionStorage.getItem("orderid"));
      //alert("update order orderid" + sessionStorage.getItem("orderid"));
      this.updateOrder(sessionStorage.getItem("orderid"), product_price);
    }
  }
  handleChange(e) {
    this.setState(e);
  }
  componentDidMount() {
    let url = "http://localhost:61891/api/Product/GetAllProducts";
    axios
      .get(url)
      .then((res) => res)
      .then((response) => {
        //
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <Navbar> </Navbar>{" "}
        <div className="heading">
          <h1> Product List </h1>{" "}
        </div>{" "}
        <div>
          <table id="tab">
            <thead>
              <tr>
                <th> Product </th> <th> Product name </th> <th> Details </th>{" "}
                <th> Product Price </th> <th>Add to cart</th>
                <th> View Product </th>{" "}
              </tr>{" "}
            </thead>
            {products.map((a) => (
              <tr>
                <td>
                  <img className="imgc" src={output} />{" "}
                </td>{" "}
                <td> {a.product_name} </td> <td> {a.product_details} </td>
                <td> {a.product_price} </td>{" "}
                <td>
                  <button
                    onClick={() =>
                      this.addtocart(a.product_id, a.product_price)
                    }
                  >
                    Add To Cart{" "}
                  </button>{" "}
                </td>{" "}
                <td>
                  <button onClick={() => this.viewproduct(a.product_name)}>
                    View Product{" "}
                  </button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </table>{" "}
        </div>{" "}
      </>
    );
  }
}
