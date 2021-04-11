import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import ToDoItem from "./ToDoItem";
import Axios from "axios";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ToDoItemCompleted from "./ToDoItemCompleted";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [Loading, setLoading] = useState(true);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  //retreving data from backend
  //called on first render
  useEffect(() => {
    Axios.get(`${backend_url}/read`).then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
    Axios.get(`${backend_url}/readCompleted`).then((res) =>
      setTaskCompleted(res.data)
    );
    // eslint-disable-next-line
  }, []);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputTask(newValue);
  }

  /* -------------------- Axios Routes for InComplete Tasks ------------------- */
  function fetchData() {
    Axios.get(`${backend_url}/read`).then((res) => setTasks(res.data));
  }
  async function addItem() {
    await Axios.post(`${backend_url}/create`, { taskName: inputTask });
    fetchData();
    setInputTask("");
  }

  async function updateTask(id, taskName) {
    await Axios.put(`${backend_url}/update/${id}`, { taskName: taskName });
    fetchData();
    // setNewValue("");
  }

  /* -------------------- Axios Routes for Completed Tasks -------------------- */
  function fetchDataCompleted() {
    Axios.get(`${backend_url}/readCompleted`).then((res) =>
      setTaskCompleted(res.data)
    );
  }

  function addTaskCompleted(id) {
    setTimeout(() => {
      setTasks((preValue) => {
        return preValue.filter((item) => {
          if (item._id === id) {
            Axios.delete(`${backend_url}/delete/${id}`);
            return item._id !== id;
          } else {
            return item;
          }
        });
      });
    }, 1000);
    setTaskCompleted((preValue) => {
      let itm = tasks.find((item) => item._id === id);
      Axios.post(`${backend_url}/createCompleted`, { taskNameCompleted: itm });
      return [...preValue, itm];
    });
  }
  async function deleteItemCompleted(id) {
    await Axios.delete(`${backend_url}/deleteCompleted/${id}`);
    fetchDataCompleted();
  }

  /* ------------------------------ Render Tasks ------------------------------ */
  function renderCompleted() {
    return !Loading
      ? taskCompleted.map((item) => {
          return (
            <ToDoItemCompleted
              key={item._id}
              id={item._id}
              item={item}
              deleteItemCompleted={deleteItemCompleted}
            />
          );
        })
      : "Loading...";
  }

  function renderInCompleted() {
    return !Loading ? (
      tasks.length > 0 ? (
        tasks.map((item) => {
          return (
            <ToDoItem
              key={item._id}
              id={item._id}
              item={item}
              taskCompleted={addTaskCompleted}
              updateTask={updateTask}
            />
          );
        })
      ) : (
        <div className="listEmpty">
          <p>Uh-Oh! Your List is Empty</p>
          <p>Add New Task</p>
        </div>
      )
    ) : (
      "Loading..."
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputText
        inputText={inputTask}
        handleChange={handleChange}
        addItem={addItem}
      />
      <Router>
        <div className="taskbtnWrapper">
          <NavLink
            className="taskBtn"
            to="/inCompleted"
            onClick={renderInCompleted}
          >
            inCompleted
          </NavLink>
          <NavLink
            className="taskBtn"
            to="/completed"
            onClick={() => {
              renderCompleted();
              fetchDataCompleted();
            }}
          >
            Completed
          </NavLink>
        </div>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/inCompleted" />
          </Route>
          <Route exact path="/inCompleted">
            {renderInCompleted}
          </Route>
          <Route exact path="/completed">
            {renderCompleted}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
