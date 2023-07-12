import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Users from './User'
import CreateUser from './CreateUser'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';
import UpdateUser from './UpdateUser';
import ViewUser from './ViewUser'

function App() {

//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchData = async() => {
//         try{
//             const response = await axios.get('http://localhost:5000/GET/users');
//             dispatch(getUser(response.data));
//         } catch(err) {
//             console.log(err)
//         }
//     }
//     fetchData();
// }, [])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
