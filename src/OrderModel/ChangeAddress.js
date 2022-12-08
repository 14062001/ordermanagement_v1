import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./ChangeAddress.css";
import Navbar from "../ProductModel/Navbar";
export default class ChangeAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  placeorder() {
    window.location = "/choosepaymentmethod";
    alert("Address updated");
  }
  render() {
    return (
      <>
        <Navbar></Navbar>

        <div className="div1">
          <div className="title">Delivery Address</div>
          <form>
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput id="form6Example1" label="First name" />
              </MDBCol>
              <MDBCol>
                <MDBInput id="form6Example2" label="Last name" />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput id="form6Example1" label="Pincode" />
              </MDBCol>
              <MDBCol>
                <MDBInput id="form6Example2" label="Locality" />
              </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass="mb-4" id="form6Example4" label="Address" />
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput id="form6Example1" label="City" />
              </MDBCol>
              <MDBCol>
                <MDBInput id="form6Example2" label="State" />
              </MDBCol>
            </MDBRow>
            <MDBInput
              wrapperClass="mb-4"
              type="tel"
              id="form6Example6"
              label="Phone"
            />

            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput id="form6Example1" label="Landmark" />
              </MDBCol>
              <MDBCol>
                <MDBInput id="form6Example2" label="Alternate phone" />
              </MDBCol>
            </MDBRow>

            <MDBBtn className="btn1" onClick={this.placeorder.bind(this)}>
              Place order
            </MDBBtn>
          </form>
        </div>
      </>
    );
  }
}
