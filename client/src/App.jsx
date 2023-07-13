import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Users from './Users';
import AddEditUser from './AddEditUser';
import ViewUser from './ViewUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<AddEditUser />} />
          <Route path="/edit/:id" element={<AddEditUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;