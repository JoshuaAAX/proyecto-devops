import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

import Books from "./pages/Books";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Loans from "./pages/Loans";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
