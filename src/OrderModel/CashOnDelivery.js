import React, { Component } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Navbar from "../ProductModel/Navbar";
export default class CashOnDelivery extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.confirmorder = this.confirmorder.bind(this);
  }
  confirmorder() {
    alert("Confirm Order!!!!" + sessionStorage.getItem("orderid"));
    // let url =
    //   "http://localhost:61891/updateorder/" + sessionStorage.getItem("orderid");
    // let url2 =
    //   "http://localhost:61891/updatepayment/" +
    //   sessionStorage.getItem("orderid");
    axios
      .put(
        "http://localhost:61891/updatepayment/" +
          sessionStorage.getItem("orderid"),
        {
          payment_method: "Cash on delivery",
        }
      )
      .then((response) => {
        alert("Payment method updated");
      })
      .catch((error) => {
        alert("Payment method updated" + error);
      });
    axios
      .put(
        "http://localhost:61891/updateorder/" +
          sessionStorage.getItem("orderid"),
        {
          quantity: sessionStorage.getItem("setquantity"),
          total_Price: sessionStorage.getItem("settotalprice"),
          status: "Payment done",
        }
      )
      .then((response) => {
        alert("Order Confirmed...Order will be shipped in few days");
        window.location = "/enteremail";
        sessionStorage.clear();
        sessionStorage.setItem("status", "Confirmed");
      })
      .catch((error) => {
        alert("cash on delivery" + error);
      });
  }
  render() {
    return (
      <>
        <Navbar></Navbar>
        <MDBContainer className="py-5" fluid>
          <MDBRow className=" d-flex justify-content-center">
            <MDBCol md="10" lg="8" xl="5">
              <MDBCard className="rounded-3">
                <MDBCardBody className="p-4">
                  <div className="text-center mb-4">
                    <h3>Settings</h3>
                    <h6>Payment</h6>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 pb-1"></div>
                  <p className="fw-bold mb-4">Add new card:</p>
                  <MDBInput
                    label="Customer's Mobile no"
                    id="form3"
                    type="integer"
                    size="lg"
                    value="+91 984525677"
                  />
                  <br></br>
                  <MDBBtn
                    color="purple"
                    size="lg"
                    block
                    onClick={this.confirmorder}
                  >
                    Confirm Order
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}
