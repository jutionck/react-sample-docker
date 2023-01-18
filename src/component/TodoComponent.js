import {useEffect, useState} from "react";
import TodoService from "../service/todoService";
import TodoListComponent from "./TodoListComponent";
import TodoFormComponent from "./TodoFormComponent";

const TodoComponent = () => {
    const [todos, setTodo] = useState([]);

    useEffect(() => {
        loadData()
    }, []);


    const loadData = () => {
        TodoService().list().then((response) => {
            setTodo(response.data)
        }).catch((e) => {
            return e.messages;
        })
    }

    const addTodo = (payload) => {
        return TodoService().save(payload)
            .then((res) => {
                return res;
            })
    }

    return (
        <section id="todo" className="todo p-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="anime-title">
                            <h2 className="text-center">Todo</h2>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 mt-3">
                        <TodoFormComponent addTodo={addTodo()} />
                    </div>
                    <div className="col-md-6 col-sm-12 mt-3">
                        {todos.map((todo, index) => (
                            <TodoListComponent key={index} index={index} todo={todo}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TodoComponent;