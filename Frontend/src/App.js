import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8080";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [newTodo, setnewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    // console.log(todos);
  }, []);

  const GetTodos = async () => {
    const data = await fetch(API_BASE + "/todos");
    const todo_list = await data.json();
    console.log(todo_list);
    setTodos(todo_list);
  };

  const completeTodo = async (id) => {
    const fetching = await fetch(API_BASE + "/todo/complete/" + id);
    const data = await fetching.json();
    console.log(data);
    GetTodos();
    // setTodos((todos) =>
    //   todos.map((todo) => {
    //     if (todo._id === data._id) {
    //       todo.complete = data.complete;
    //     }

    //     return todo;
    //   })
    // );
  };

  const deleteTodo = async (id) => {
    const fetching = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    });
    const data = await fetching.json();
    console.log(data);
    // GetTodos();
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    });
    // .then((res) => res.json());

    // setTodos([...todos, data]);
    GetTodos();

    setPopUpActive(false);
    setnewTodo("");
  };

  return (
    <div className="App">
      <h1>Hii Mukhesh</h1>
      <h4>YOUR TASKS</h4>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-completed" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>

            <div className="text">{todo.text}</div>

            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </div>
          </div>
        ))}
      </div>
      <div className="addPopup" onClick={() => setPopUpActive(true)}>
        +
      </div>
      {popUpActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopUpActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setnewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
