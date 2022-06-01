import logo from './logo.svg';
import './App.css';
import {TodoItem} from "./components/TodoItem";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {useEffect, useState} from "react";                                //icons
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

function App() {
    const [list, setList] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        // goi api lay du lieu
        const getTodo = async () => {
            const response = await axios.get('http://localhost:8080/todo');
            const { data } = response;
            setList(data);
        }
        getTodo();
    }, [])

    const handleOnChangeText = (event) => {
        setText(event.target.value);
    }

    const handleOnClick = async () => {
        // goi api tao moi
        const response = await axios.post(
            'http://localhost:8080/todo',
            { message: text, completed: false }
        );
        // gan du lieu todo
        const { data } = response;
        setList([...list, data]);
        // reset truong text
        setText('');
    }

    const handleOnClickDelete = async (id) => {
        await axios.delete('http://localhost:8080/todo/' + id);
        const newList = list.filter(item => item.id !== id);
        setList(newList);
    }

    return (
        <>
            <div className="container">
                <h1>My todo app</h1>
                <div>
                    <span className="p-float-label">
                        <InputText id="new_todo" value={text} onChange={handleOnChangeText}/>
                        <label htmlFor="new_todo">New todo</label>
                    <Button icon="pi pi-plus" className="p-button-rounded" aria-label="Add" onClick={handleOnClick}/>
                    </span>
                </div>
                {list.map(item =>
                    <TodoItem
                    message={item.message}
                    key={item.id}
                    onDelete={() => handleOnClickDelete(item.id)}
                    />
                )}
            </div>
        </>
    );
}

export default App;
