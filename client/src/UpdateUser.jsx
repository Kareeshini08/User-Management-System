import axios from "axios";
import { useState, useEffect } from "react";
import { updateUser, getUserById } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

function UpdateUser() {
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

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/PUT/users/${id}`, state)
      .then((res) => {
        dispatch(updateUser({ id, ...state }));
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
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
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
