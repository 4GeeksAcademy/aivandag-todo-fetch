import React, { useState } from "react";
import "../../styles/Todo.css";

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

            setListaTarea([...listaTarea, tarea]);
            setTarea(inicialEstadoTarea);
        }
    };


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
                                    setListaTarea(listaTarea.filter((_, i) => i !== index))
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





