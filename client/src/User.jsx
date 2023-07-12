import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser, deleteUser } from './redux/userSlice';

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
    // console.log(useSelector(state => state.users.users))
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/DELETE/users/${id}`)
        .then(res => {
            dispatch(deleteUser({id}))
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm">
                    Add +
                </Link>
                <table className="table">
                    <thead>
                        <tr> 
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger me-2">Delete</button>
                                    <Link to={`/view/${user.id}`} className="btn btn-sm btn-success">View</Link>
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