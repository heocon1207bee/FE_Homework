import React from 'react'
import './App.css';
import students from './data/students.json'
import Student from "./components/Student";

function App() {
    return (
        <div className="container">
            <Student students={students}/>
        </div>
    )
}

export default App;