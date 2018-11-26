import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    tasks: [],
    new_task: "",
    status: ""
  };

  reloadTasksList = () => {
    axios.get("http://localhost:3000/").then(response => {
      console.log("response", response.data);
      this.setState({ tasks: response.data });
    });
  };

  onSubmit = event => {
    axios.post("http://localhost:3000/create", {
      name: this.state.new_task
    });
    // .then({});
    // event.preventDefault();
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
    console.log({ [name]: value });
  };

  deleteTask = event => {
    console.log(event);
    // axios.post("http://localhost:3000/delete", {
    //   name: this.state.new_task
    // });
  };

  render() {
    const tasks = [];
    for (let i = 0; i < this.state.tasks.length; i++) {
      tasks.push(
        <div>
          <span
            key={i}
            onClick={() => {
              console.log(this.state.tasks[i].name);
              axios
                .post("http://localhost:3000/delete", {
                  name: this.state.tasks[i].name
                })
                .then(response => {
                  this.reloadTasksList();
                });
            }}
          >
            {" "}
            X
          </span>
          <span
            className={
              this.state.tasks[i].status === "to-do" ? "to-do" : "done"
            }
            key={i}
            onClick={() => {
              axios
                .post("http://localhost:3000/update", {
                  name: this.state.tasks[i].name
                })
                .then(response => {
                  this.state.tasks[i].status = response.data.status;
                  this.reloadTasksList();
                });
            }}
          >
            {" "}
            {this.state.tasks[i].name}{" "}
          </span>
        </div>
      );
    }
    return (
      <div>
        <h1> To-do List </h1>
        {tasks}
        <form onSubmit={this.onSubmit}>
          <input
            id="new_task"
            name="new_task"
            type="text"
            placeholder="Titre"
            onChange={this.handleChange}
          />
          <button type="submit" className="btn">
            AJOUTER UNE TÂCHE
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.reloadTasksList();
  }
}

export default App;
