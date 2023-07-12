import {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import "./ViewUser.css";
import axios from "axios";

function ViewUser() {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/GET/users/${id}`).then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);
    return (
        <div style={{ marginTop: "150px" }}> 
            <div className="card">
                <div className="card-header"> 
                    <p>User Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span> 
                    <br />
                    <br />
                </div>
                <div className="container">
                    <strong>Name: </strong>
                    <span>{user.name}</span> 
                    <br />
                    <br />
                </div><div className="container">
                    <strong>Email: </strong>
                    <span>{user.email}</span> 
                    <br />
                    <br />
                </div><div className="container">
                    <strong>Phone Number: </strong>
                    <span>{user.phone}</span> 
                    <br />
                    <br />
                    <Link to="/">
                        <input type="button" value="Go Back" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewUser
