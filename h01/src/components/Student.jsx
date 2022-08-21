import React from "react";

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: this.props.students
        }
    }

    // Hàm xóa tất cả member
    handleDeleteAll = () => {
        this.setState({
            students: []
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleDeleteAll}>delete all</button>
                {
                    // Check nếu có data thì in ra màn hình, không có in ra empty
                    this.state.students.length > 0 ?
                    this.state.students.map((student, index) => {
                        let image = ''
                        // Nếu ko có file require sẽ bị lỗi nên dùng try catch
                        try {
                            image = require('../image/' + student.avatar)
                        } catch (e) {
                            console.log('could not load ' + student.avatar)
                        }
                        return (
                            <div className="student" key={student.name + index}>
                                <h1>Student {index + 1}</h1>
                                <p>name: {student.name}</p>
                                <p>age: {student.age}</p>
                                <p>birthday: {student.birthday}</p>
                                <img src={image} alt="Could not load image"/>
                                <p>address: {student.address}</p>
                            </div>
                        )
                    }) : <div>Student list is empty!</div>
                }
            </div>
        )
    }
}

export default Student