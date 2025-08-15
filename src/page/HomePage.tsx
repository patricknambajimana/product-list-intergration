import Navbar from "../components/product/NavBar";
import { Outlet } from "react-router-dom";
const HomePage: React.FC = () => {
  return (
    <div className="flex">
      <Navbar />
        <Outlet />
    </div>
  );
};

export default HomePage;
