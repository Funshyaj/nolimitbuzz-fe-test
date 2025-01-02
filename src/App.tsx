import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import UserDetails from "./pages/UserDetails.tsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
