import {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

function ViewUser() {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/GET/users/${id}`).then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);
    
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center container1">
            <div className="w-50 bg-white rounded p-3">
                <h4 style={{ marginBottom: "15px"}}>USER DETAIL</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr> 
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/" className="btn">GO BACK</Link>
            </div>
        </div>
    );
};

export default ViewUser;
