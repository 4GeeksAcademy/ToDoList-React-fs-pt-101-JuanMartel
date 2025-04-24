import React, { useEffect, useState } from "react";

const ToDoList = () => {
    const [task, setTask] = useState('');
    const [data, setData] = useState([]);

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/jonyMontana', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`Error: ${resp.status}`);
                return resp.json();
            })
            .then(data => console.log("Usuario creado:", data))
            .catch(error => console.log('Error:', error));
    };

    const getUserToDos = () => {
        fetch('https://playground.4geeks.com/todo/users/jonyMontana', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`Error: ${resp.status}`);
                return resp.json();
            })
            .then(parsedJson => setData(parsedJson.todos))
            .catch(error => console.log('Error:', error));
    };

    const createTask = () => {
        fetch('https://playground.4geeks.com/todo/todos/jonyMontana', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: task, is_done: false })
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`Error: ${resp.status}`);
                return resp.json();
            })
            .then(() => getUserToDos()) 
            .catch(error => console.log("Error", error));
    };

const handleDelete = id  => {
    fetch('https://playground.4geeks.com/todo/todos/'+id, {
        method: "DELETE",
    })
        .then(resp => {
            getUserToDos()
        })
        .catch(error => console.log(error));
}
    

    useEffect(() => {
        createUser();
        getUserToDos();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(); 
        setTask(''); 
    };

    

    return (
        <div className="container bg-light mt-5">
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
                <input type="submit" hidden />
            </form>

            <div className="contenedor tareas">
                {data.map((el, i) => <ol key={i} className="list-group-item">{el.label} 
                    <span className="btn btn-danger" onClick={()=>handleDelete(el.id)}>  X </span></ol>
                )}
            </div>
        </div>
    );
};

export default ToDoList;