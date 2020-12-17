import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Price extends Component {
  constructor() {
    super();
    this.state = {
      priceId: "",
      productId: "",
      priceValue: "",
    };
  }

  //Handles Creation
  onSubmit = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify(this.state));
    const priceCreate = {
      productId: this.state.productId,
      priceValue: this.state.priceValue,
    };
    axios
      .post("http://localhost:9021/microservices/price", priceCreate)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("data", JSON.stringify(response.data));
        toast.dark("Price added !", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((err) =>
        toast.error("Error!!", {
          position: "top-center",
          autoClose: 5000,
        })
      );
  };

  handleDelete = (event) => {
    this.setState({ priceId: event.target.value });
  };

  onDelete = (event) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:9021/microservices/price/${this.state.priceId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.dark("Price Deleted !", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify(this.state));
    const priceUpdate = {
      priceId: this.state.productId,
      productId: this.state.productId,
      priceValue: this.state.priceValue,
    };

    axios
      .put(
        `http://localhost:9021/microservices/price/${this.state.priceId}`,
        priceUpdate
      )
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("data", JSON.stringify(response.data));
        toast.dark("Price Updated !", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((err) =>
        toast.error("Error!", {
          position: "top-center",
          autoClose: 5000,
        })
      );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const headerStyle = {
      borderBottom: "5px solid rgb(169, 169, 169)",
      marginBottom: "10%"
    };
    const buttonStyle = {
      marginBottom: "10%"
    };
    return (
      <div className="Product">
        <div className="p-3 mb-2 bg-light text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4" style={headerStyle}> Create a New Price</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Product ID"
                      name="productId"
                      required
                      value={this.state.productId}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Price Value"
                      name="priceValue"
                      value={this.state.priceValue}
                      onChange={this.handleChange}
                    />
                  </div>
                  <ToastContainer />
                  <input
                    style={buttonStyle}
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle}> Delete a Price</h1>
                <form onSubmit={this.onDelete}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="ID"
                      name="priceId"
                      required
                      value={this.state.priceId}
                      onChange={this.handleDelete}
                    />
                  </div>
                  <input
                    style={buttonStyle}
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle}>Update a Price</h1>
                <form onSubmit={this.onUpdate}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="ID"
                      name="priceId"
                      required
                      value={this.state.priceId}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Product ID"
                      name="productId"
                      required
                      value={this.state.productId}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Price Value"
                      name="priceValue"
                      value={this.state.priceValue}
                      onChange={this.handleChange}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
