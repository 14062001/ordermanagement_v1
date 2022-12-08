import React, { Component } from "react";
//onChange={this.onChangeValue}
import { MDBRadio, MDBBtn } from "mdb-react-ui-kit";
import "./ChoosePaymentMethod.css";
import Navbar from "../ProductModel/Navbar";
export default class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChangeValue = this.onChangeValue.bind(this);
    this.payment = this.payment.bind(this);
  }
  onChangeValue(event) {
    sessionStorage.setItem("paymentmethod", event.target.value);
  }
  payment() {
    alert(sessionStorage.getItem("paymentmethod"));
    if (sessionStorage.getItem("paymentmethod") == "Online") {
      window.location = "/onlinepayment";
    } else {
      window.location = "/cashondelivery";
    }
  }
  render() {
    return (
      <>
        <Navbar></Navbar>
        <div className="outerdiv">
          <div className="title">Payment Options</div>

          <div className="choose-form" onChange={this.onChangeValue}>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault1"
              label=" UPI"
              value={"Online"}
            />
            <br></br>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label=" Wallets"
              value={"Online"}
              defaultChecked
            />
            <br></br>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Credit/Debit/ATM Card"
              value={"Online"}
            />
            <br></br>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Net Banking"
              value={"Online"}
            />
            <br></br>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="EMI"
              value={"Online"}
            />
            <br></br>
            <MDBRadio
              name="flexRadioDefault"
              id="flexRadioDefault2"
              label="Cash on delivery"
              value={"Cash on delivery"}
            />
            <br></br>
            <MDBBtn className="btn1" onClick={this.payment}>
              Continue
            </MDBBtn>
          </div>
        </div>
      </>
    );
  }
}
