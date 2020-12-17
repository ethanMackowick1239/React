import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      comment: "",
      rating: "",
      productId: "",
      username: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify(this.state));
    const review = {
      comment: this.state.comment,
      rating: this.state.rating,
      productId: this.state.productId,
      username: this.state.username
    };
    axios
      .post("http://localhost:9021/microservices/review", review)
      .then((response) => {
        console.log(response.data)

        localStorage.setItem('data', JSON.stringify(response.data))
        toast.dark("Review added !", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((err) => toast.error("Error!!", {
        position: "top-center",
        autoClose: 5000,
      }));
  };

  onUpdate = (e) => {
    e.preventDefault();
    console.log("Final state: " + JSON.stringify(this.state));
    const review = {
      reviewId: this.state.reviewId,
      comment: this.state.comment,
      rating: this.state.rating,
      productId: this.state.productId,
      username: this.state.username
    };
    axios
      .put(`http://localhost:9021/microservices/${this.state.id}`, review)
      .then((response) => {
        console.log(response.data)

        localStorage.setItem('data', JSON.stringify(response.data))
        toast.dark("Review updated !", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((err) => toast.error("Error!", {
        position: "top-center",
        autoClose: 5000,
      }))
  };

  handleDelete = event => {
    this.setState({ id: event.target.value });
  }

  onDelete = event => {
    event.preventDefault();

    axios.delete(`http://localhost:9021/microservices/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    toast.dark("Review deleted!", {
      position: "top-center",
      autoClose: 5000,
    });
  }

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
                <h1 className="display-3 mb-4" style={headerStyle} >Create a Review</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Comment" name="comment" required
                      value={this.state.comment}
                      onChange={this.handleChange} />
                  </div>
                  <ToastContainer />
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Rating" name="rating" value={this.state.rating} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="ProductId" name="productId" value={this.state.productId} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                  </div>
                  <input type="submit" style={buttonStyle} className="btn btn-info btn-block mt-4" />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle} > Delete a Review </h1>
                <form onSubmit={this.onDelete}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Id" name="deleteId" required
                      value={this.state.id}
                      onChange={this.handleDelete} />
                  </div>
                  <input type="submit" style={buttonStyle} className="btn btn-info btn-block mt-4" />
                </form>

                <h1 className="display-3 mb-4" style={headerStyle}> Update a Review</h1>
                <form onSubmit={this.onUpdate}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Id" name="updateId" required
                      value={this.state.id}
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Comment" name="comment" required
                      value={this.state.comment}
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Rating" name="rating" value={this.state.rating} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="ProductId" name="productId" value={this.state.productId} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
