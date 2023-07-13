import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser, deleteUser } from './redux/userSlice';
import "./style.css";

function Users() { 
    const dispatch = useDispatch()

    useEffect(() => {
    const fetchData = async() => {
        try{
            const response = await axios.get('http://localhost:5000/GET/users');
            dispatch(getUser(response.data));
        } catch(err) {
            console.log(err)
        }
    }
    fetchData();
    }, [])

    const users = useSelector(state => state.users.users)
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/DELETE/users/${id}`)
        .then(res => {
            dispatch(deleteUser({id}))
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center container1">
            <div className="w-50 bg-white rounded p-3">
                <h4>USER MANAGEMENT SYSTEM</h4>
                <Link to="/create" className="btn btn mb-3 float-end">
                    ADD USER
                </Link>
                <table className="table table-bordered">
                    <colgroup>
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "35%" }} />
                    </colgroup>
                    <thead>
                        <tr> 
                            <th>ID</th>
                            <th>NAME</th>
                            <th>ACTION</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <Link to={`/view/${user.id}`} className="btn btn-sm me-4 ms-4">VIEW</Link>
                                    <Link to={`/edit/${user.id}`} className="btn btn-sm me-4">EDIT</Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm">DELETE</button>
                                </td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;