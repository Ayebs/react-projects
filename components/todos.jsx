import Todo from "./todo"

function Todos(props) {
    if (props.todos.length === 0) {
        return <p>No tasks added yet!</p>
    } else {
        return (
            <>
            {
                props.todos.map((todo) => (
                    <Todo todo={todo} key={todo.id} 
                    onDelete={props.onDelete}
                    onComplete={props.onComplete} />
                ))}
            
            </>
        )
    }
}



export default Todos