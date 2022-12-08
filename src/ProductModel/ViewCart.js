import React, { Component } from "react";
import "./ViewCart.css";
import Navbar from "./Navbar";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default class ViewCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      order_id: sessionStorage.getItem("orderid"),
      total_price: sessionStorage.getItem("settotalprice"),
      quantity: sessionStorage.getItem("setquantity"),
    };
    this.dproduct = this.dproduct.bind(this);
  }

  dproduct(productid, productprice) {
    alert("Are you sure you want to delete " + productid);
    alert(sessionStorage.getItem("orderid"));
    let url = "http://localhost:61891/api/Product/updateorder/" + productid;
    axios
      .put(url, {
        order_id: null,
      })
      .then((response) => {
        let q = parseInt(sessionStorage.getItem("setquantity")) - 1;
        sessionStorage.setItem("setquantity", q);
        let t = parseInt(
          sessionStorage.getItem("settotalprice") - productprice
        );
        sessionStorage.setItem("settotalprice", t);
        console.log(sessionStorage.getItem("settotalprice"));
        console.log(sessionStorage.getItem("setquantity"));
        console.log("hii");
        window.location.reload();
      })
      .catch((error) => {
        let q = parseInt(sessionStorage.getItem("setquantity")) - 1;
        sessionStorage.setItem("setquantity", q);
        let t = parseInt(
          sessionStorage.getItem("settotalprice") - productprice
        );
        sessionStorage.setItem("settotalprice", t);
        console.log(sessionStorage.getItem("settotalprice"));
        console.log(sessionStorage.getItem("setquantity"));
        window.location.reload();
      });
  }
  orderconfirm(orderid) {
    alert("Confirm Order!!!!");
    let url = "http://localhost:61891/updateorder/" + orderid;
    axios
      .put(url, {
        quantity: sessionStorage.getItem("setquantity"),
        total_Price: sessionStorage.getItem("settotalprice"),
        status: "Confirmed",
      })
      .then((response) => {
        alert("Order Confirmed...Order will be shipped in few days");
        window.location = "/changeaddress";
        // sessionStorage.clear();
        sessionStorage.setItem("status", "Confirmed");
      })
      .catch((error) => {
        alert("order confirm error" + error);
      });
  }
  ordercancle(orderid) {
    alert("Do you want to cancel order?");
    let url = "http://localhost:61891/updateorder/" + orderid;
    axios
      .put(url, {
        status: "Cancelled",
      })
      .then((response) => {
        alert("Order Cancelled");
        window.location = "/enteremail";
        sessionStorage.clear();
        sessionStorage.setItem("status", "Cancelled");
      })
      .catch((error) => {
        alert(error);
      });
  }
  componentDidMount() {
    let url =
      "http://localhost:61891/api/Product/orderedproducts/" +
      sessionStorage.getItem("orderid");
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
        <Navbar></Navbar>
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol>
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <MDBRow>
                      <MDBCol lg="7">
                        <MDBTypography tag="h5">
                          <a href="/viewallproducts" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" />
                            Continue shopping
                          </a>
                        </MDBTypography>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                            <p className="mb-0">
                              You have {this.state.quantity} items in your cart
                            </p>
                          </div>
                          x
                        </div>
                        {products.map((a) => (
                          <MDBCard className="mb-3">
                            <MDBCardBody>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <MDBCardImage
                                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                                      fluid
                                      className="rounded-3"
                                      style={{ width: "65px" }}
                                      alt="Shopping item"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <MDBTypography tag="h5">
                                      {a.product_name}
                                    </MDBTypography>
                                    <p className="small mb-0">
                                      {a.product_details}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}></div>
                                  <div style={{ width: "80px" }}>
                                    <MDBTypography tag="h5" className="mb-0">
                                      {a.product_price}
                                    </MDBTypography>
                                  </div>
                                  <button
                                    style={{ color: "#cecece" }}
                                    onClick={this.dproduct.bind(
                                      this,
                                      a.product_id,
                                      a.product_price
                                    )}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                      </MDBCol>

                      <MDBCol lg="5">
                        <br></br>
                        <MDBCard className="text-black rounded-3">
                          <MDBCardBody>
                            <hr />

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Total(Incl. taxes)</p>
                              <p className="mb-2">{this.state.total_price}</p>
                            </div>
                            <br></br>
                            <MDBBtn
                              onClick={this.orderconfirm.bind(
                                this,
                                this.state.order_id
                              )}
                              color="purple"
                              block
                              size="lg"
                            >
                              <div className="d-flex justify-content-between">
                                <span>
                                  {sessionStorage.getItem("settotalprice")}
                                </span>
                                <span>
                                  Confirm Order
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                              </div>
                            </MDBBtn>
                            <br></br>
                            <br></br>
                            <MDBBtn
                              onClick={this.ordercancle.bind(
                                this,
                                this.state.order_id
                              )}
                              color="purple"
                              block
                              size="lg"
                            >
                              <div className="d-flex justify-content-between">
                                <span></span>
                                <span>
                                  Cancle Order
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                              </div>
                            </MDBBtn>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </>
    );
  }
}
