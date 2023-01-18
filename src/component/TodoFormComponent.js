import {useState} from "react";

const TodoFormComponent = ({addTodo}) => {
    const [todo, setTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo(todo);
        setTodo('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <input type="checkbox" className="form-check-input"/>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Todo"
                    aria-label="Todo"
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <button className="btn btn-outline-primary" type={"submit"}>ADD</button>
            </div>
        </form>
    )
}

export default TodoFormComponent;