import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Users from './Users';
import UpdateUser from './AddEditUser';
import ViewUser from './ViewUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<UpdateUser />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;