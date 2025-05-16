import React, { useEffect, useState } from "react";
import "../../styles/Todo.css";

const apiUrl = "https://playground.4geeks.com/todo"
const userName = "aivandag"

const inicialEstadoTarea = {
    label: "",
    is_done: false
};

const Todo = () => {
    const [tarea, setTarea] = useState(inicialEstadoTarea);
    const [listaTarea, setListaTarea] = useState([]);

    const handleChange = (evento) => {
        setTarea({
            ...tarea,
            is_done: false,
            label: evento.target.value,
        });
    };

    const handleSubmit = (evento) => {
        evento.preventDefault();

        if (tarea.label.trim() === "") return; {

            addTask()
            setTarea(inicialEstadoTarea);
        }
    };

    const createUser = () => {
        fetch(`${apiUrl}/users/${userName}`, { method: "POST" })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const getTasks = () => {
        fetch(`${apiUrl}/users/${userName}`)
            .then(response => {
                if (response.status == 404) {
                    createUser()
                    return false
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setListaTarea(data.todos)
                }
            })
    }

    const addTask = () => {
        fetch(`${apiUrl}/todos/${userName}`, {
            method: "POST",
            body: JSON.stringify(tarea),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

            })
            .then(data => {
                if (data) {
                    setListaTarea([...listaTarea, data])
                }
            })
    }


   const deleteTask = (id) => {
    fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
         
            setListaTarea(listaTarea.filter((item) => item.id !== id));
        } else {
            console.error("Error al eliminar la tarea.");
        }
    })
    .catch(err => console.error("Error en la solicitud DELETE:", err));
};





    useEffect(() => {
        getTasks()
    }, [])

    return (

        <div className="container">
            <h1 className="titulo"> ToDos</h1>
            <form className="border" onSubmit={handleSubmit} >
                <input
                    className="input-tarea"
                    type="text"
                    placeholder="What needs to be done?"
                    name="label"
                    value={tarea.label}
                    onChange={handleChange}

                />
            </form>

            <ul className="lista">
                {listaTarea.length === 0 ? (
                    <li className="lista-item">no tienes tareas pendientes, agrega 1 tarea</li>
                ) : (

                    listaTarea.map((item, index) => (
                        < li
                            key={index}
                            className="lista-item"
                        >
                            {item.label}

                            <span
                                className="delete"

                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    deleteTask(item.id)
                                }
                            >
                                ❌
                            </span>
                        </li>
                    ))
                )}
            </ul >
            <div className="pie">
                {listaTarea.length} {listaTarea.length === 1 ? "tarea" : "tareas"} pendientes
            </div>
        </div >

    );

};

export default Todo;





