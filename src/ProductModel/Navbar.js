import React, { Component } from "react";
import { BrowserRouter, Link, Router, Route } from "react-router-dom";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Nav from "react-bootstrap/Nav";
import { Button } from "bootstrap";
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.logout = this.logout.bind(this);
  }
  logout() {
    sessionStorage.clear();
    window.location = "/";
  }
  render() {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">ShopNow</span>
          </div>
          {/* <div className="topRight">
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
        </div>
      </div>*/}

          <Nav.Item>
            <Nav.Link href="/viewcart" className="links">
              <b>View Cart</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myorders">
              <b>My Orders</b>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/viewallproducts">
              <b>All products</b>
            </Nav.Link>
          </Nav.Item>
          <button onClick={this.logout}>Log out</button>
        </div>
      </div>
    );
  }
}
