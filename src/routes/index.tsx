import {
  Route,
  Routes as RoutesApp,
} from "react-router-dom";
import { Home } from "../pages/home"
import { Imc } from "../pages/imc";
import { Login } from "../pages/login"
import { RegisterUser } from "../pages/register-user"
import { ReportUser } from "../pages/report/user";
import { AuthProvider } from "../Providers/auth";

const Routes = () => {
  return (
    <>
      <AuthProvider>
        <RoutesApp >
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="calc-imc" element={<Imc />} />
          <Route path="register-professional" element={<RegisterUser />} />
          <Route path="register-student" element={<RegisterUser />} />
          <Route path="list-student" element={<ReportUser />} />
          <Route path="list-professional" element={<ReportUser />} />
        </RoutesApp>
      </AuthProvider>

      <RoutesApp >
        <Route path="register-user" element={<RegisterUser />} />
      </RoutesApp>
    </>

  )
}

export default Routes
