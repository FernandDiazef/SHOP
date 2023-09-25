import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { LoginProvider } from "../../pages/Login/context";
import { NotFound } from "../../pages/not-found";
import { Register } from "../../pages/Register";
import RoutesPriv from "../routesPriv/routesPriv";

function App() {
  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<RoutesPriv />} />

            <Route path='/error/404' element={<NotFound />} />
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
