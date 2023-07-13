import axios from "axios";
import { useState, useEffect } from "react";
import { addUser, updateUser, getUserById } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

function AddEditUser() {
  const [state, setState] = useState(initialState);

  const { name, email, phone } = state;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/GET/users/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/GET/users/${id}`);
        dispatch(getUserById(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!id) {
      axios.post('http://localhost:5000/POST/users', {name, email, phone})
      .then(res => {
          dispatch(addUser(res.data));
          navigate('/');
        })
      .catch(err => console.log(err))
    }
    else{
      axios
      .put(`http://localhost:5000/PUT/users/${id}`, state)
      .then((res) => {
        dispatch(updateUser({ id, ...state }));
        navigate('/');
      })
      .catch((err) => console.log(err));
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center container1">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          { id ? (
            <h4>UPDATE USER</h4>
          ) : (
          <h4>CREATE USER</h4>
          )}          
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="form-control"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <input type="submit" value={id ? "UPDATE" : "CREATE"} className="btn mt-1" />
        </form>
      </div>
    </div>
  );
}

export default AddEditUser;
