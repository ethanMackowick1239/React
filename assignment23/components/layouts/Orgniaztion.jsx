import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      productId: "",
      productName: "",
      category: "",
      description: "",
      expiryDate: "",
    };
  }

  //Handles Creation
  onSubmit = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify
      (this.state));
    const product = {
      productName: this.state.productName,
      category: this.state.category,
      description: this.state.description,
      expiryDate: this.state.expiryDate,
    };
    axios
      .post("http://localhost:9021/microservices/product", product)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("data", JSON.stringify(response.data));
        toast.dark("Product added !", {
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

  //Handles Update
  onUpdate = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify(this.state));
    const productUpdate = {
      productId: this.state.productId,
      productName: this.state.productName,
      category: this.state.category,
      description: this.state.description,
      expiryDate: this.state.expiryDate,
    };
    axios
      .put(`http://localhost:9021/microservices/product/${this.state.productId}`, productUpdate)
      .then((response) => {
        console.log(response.data)

        localStorage.setItem('data', JSON.stringify(response.data))
        toast.dark("Product updated !", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((err) => toast.error("Error!", {
        position: "top-center",
        autoClose: 5000,
      }))
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //Handles Deletion
  handleDelete = (event) => {
    this.setState({ productId: event.target.value });
  };

  onDelete = (event) => {
    event.preventDefault();

    axios
      .delete(
        `http://localhost:9021/microservices/product/${this.state.productId}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.dark("Product deleted!", {
      position: "top-center",
      autoClose: 5000,
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
                <h1 className="display-3 mb-4" style={headerStyle}>Create a Product</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      name="productName"
                      required
                      value={this.state.productname}
                      onChange={this.handleChange}
                    />
                    <ToastContainer />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Category"
                      name="category"
                      value={this.state.category}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      placeholder="Expiry Date"
                      name="expiryDate"
                      value={this.state.expire}
                      onChange={this.handleChange}
                    />
                  </div>
                  <input
                    style={buttonStyle}
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle}>Delete a Product</h1>
                <form onSubmit={this.onDelete}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Id"
                      name="productname"
                      required
                      value={this.state.productId}
                      onChange={this.handleDelete}
                    />
                  </div>
                  <input
                    style={buttonStyle}
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle}> Update a Product</h1>
                <form onSubmit={this.onUpdate}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Id"
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
                      placeholder="Name"
                      name="productName"
                      required
                      value={this.state.productName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Category"
                      name="category"
                      value={this.state.category}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      placeholder="Expiry Date"
                      name="expiryDate"
                      value={this.state.expiryDate}
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
