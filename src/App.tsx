import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./route/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
