const TodoListComponent = ({todo, index}) => {
    return (
        <div className="container">
            <div className="todo">
                <span style={{textDecoration: todo.completed ? "line-through" : ""}}> {todo.name} </span>
            </div>
        </div>
    )
}

export default TodoListComponent;