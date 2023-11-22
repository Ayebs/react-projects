import { useEffect, useState } from "react";
import Todos from "../components/todos";
import Style from "./App.module.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  // load todos from local storge
  // useEffect(() => {
  //   const localData = JSON.parse(localStorage.getItem("tasks"));
  //   if (localData === null) {
  //     setTodos([]);
  //   } else {
  //     setTodos(localData)
  //   }
  // }, []); //the empy [] means that we want the data to be read just once in the app

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`)
        const results = await response.json()
        if (results) {
          setTodos(results);
        }
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message)
        console.log("err", error.message);
      }
    }

    fetchData()
  }, [loading])

  // useEffect(() => {
  //   if (todos.length >= 1) {
  //     localStorage.setItem("tasks", JSON.stringify([...todos]));
  //   }}, [todos])

  // const completeTodo = (id) => {
  //   const newTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return { ...todo, completed: !todo.completed };
  //     }
  //     return todo;
  //   });

  //   setTodos(newTodos);
  // };


  async function completeTodo(id) {
    try {
      setLoading(true);
      const request = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const response = await request.json();
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteToDo(id) {
    try {
      setLoading(true);
      const request = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const response = await request.json();
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  // function deleteToDo (id) {
  //   const index = todos.findIndex((todo) => todo.id === id);
  //   if (index !== -1) {
  //     const newTodos = [...todos];
  //     const del = newTodos.splice(index, 1)
  //     const delId = del[0].id;
  //     const localData =JSON.parse(localStorage.getItem("tasks"))

  //     const remTodos = localData.filter((dt) => dt.id !== delId)

  //     // localStorage.setItem("tasks", JSON.stringify([...remTodos]))

  //     setTodos(remTodos)
  //   } else {
  //     return "the index does not exist"
  //   }
  // };

  // function addToDo(event) {
  //   event.preventDefault();

  //   if (!task) {
  //     return;
  //   } else {
  //     const todo = {
  //       id: todos.length + 1,
  //       chore: task,
  //       completed: false,
  //     };

  //     setTodos([...todos, todo]);
  //     // localStorage.setItem("tasks", JSON.stringify([...todos, todo]));
  //     setTask("");
  //   }
  // }

  async function addToDo(event) {
    event.preventDefault();
    const todo = {
      chore:task
    }

    try {
      setLoading(true)
      const request = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json()
      setLoading(false)
      console.log(response);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  if (hasError) {
    return (
      <div style={{fontSize: "2rem", color: "pink"}}>Oops! Something went wrong:{errorMessage}</div>
    )
  }

  return (
    <div className={Style.app}>
      <form action="" onSubmit={addToDo}>
        <label htmlFor="task" className={Style.label}>
          Add a task
        </label>{" "}
        <br />
        <div className={Style.inputContainer}>
          <input
            className={Style.inputField}
            type="text"
            name=""
            id="task"
            placeholder="New task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          {/* <button className={Style.button}>Add task</button> */}
          <button className={Style.button} disabled={!task}>
            Add task
          </button> {/* the line above disables the add task button when the input field is empty */}
        </div>
      </form>


      {loading ? (
      <div style={{fontSize: "2rem", color: "red"}}>Loading...</div>
      ) : todos.length > 0 && (
      <Todos todos={todos} onDelete={deleteToDo} onComplete={completeTodo} />
      )}

    </div>
  );
}
 
export default App;
