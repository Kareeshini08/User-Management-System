import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/POST/users', {name, email, phone})
        .then(res => {
            dispatch(addUser(res.data));
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3"> 
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2"> 
                        <label htmlFor="">Name</label>
                        <input type="text" placeholders="Enter Name" className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2"> 
                        <label htmlFor="">Email</label>
                        <input type="email" placeholders="Enter email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div><div className="mb-2"> 
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholders="Enter phone number" className="form-control" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className="btn  btn-success">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;