import { Outlet } from "react-router-dom";
import AuthLogin from "../components/AuthLogin";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-cols gap-4 text-center max-h-screen w-full">
      <div className=" text-neutral-400/30 border w-300  h-screen text-center bg-green-900 p-15">
        <h2 className="font-extrabold capitalize w-full  text-5xl ">
          <strong className="text-gray-950 text-7xl">
            <span className="lowercase">e</span>GURA
          </strong>
           Product management system
        </h2>
      </div>
      <div className="flex items-center justify-center w-full max-w">
        <AuthLogin />
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
