import TodoStyle from "../styling/todo.module.css";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoIosTrash } from "react-icons/io";

function Todo(props) {
  console.log("props from Todo ----", props);

  const handleDelete = () => {
    props.onDelete(props.todo._id);
  };

  const handleComplete = () => {
    props.onComplete(props.todo._id);
  };

    return (
      <div className={TodoStyle.choreDiv}>
        <p
          className={`${TodoStyle.taskText}
              ${props.todo.completed ? TodoStyle.completed : ""}`}>
          {props.todo.chore}
        </p>
        <FaRegCheckSquare className={TodoStyle.button} onClick={handleComplete} />
        {/* <button className={TodoStyle.button} onClick={handleComplete}>Complete</button> */}
        <IoIosTrash className={TodoStyle.button} onClick={handleDelete} />
      </div>
    );


// this is a different UI for the way completed tasks should look 
//   return (
//     <div className={TodoStyle.choreDiv}>
//       <p>{props.todo.chore}</p>
//       <div>
//         <button className={TodoStyle.button} onClick={handleComplete}>
//           {props.todo.completed === true ? "completed" : "pending"}
//         </button>
//         <IoIosTrash className={TodoStyle.button} onClick={handleDelete} />
//       </div>
//     </div>
//   );
}

export default Todo;
