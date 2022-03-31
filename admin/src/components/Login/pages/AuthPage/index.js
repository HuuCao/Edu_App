import { Tabs,Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Route, Switch } from "react-router-dom";
import Login from "../../components/Login";
import login from "../../../../image/Vector.png";
import "./pages.scss";
const { TabPane } = Tabs;

function AuthPage(props) {
  const location = useLocation();
  const history = useHistory();
  const initialMode = location.pathname === "/login" ? "login" : "register";
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/login") {
      setMode("login");
    } else {
      setMode("register");
    }
  }, [location]);

  const callback = (key) => {
    if (key === "login") {
      history.push("/login");
    } else {
      history.push("/register");
    }
  };

  return (
    <div className="authPage-content">
      <div className="login-back">
        <img src={login} className="img-login"/>
        <div className="login-title">
          Đăng Nhập
        </div>
       
       
        <div className="authPage">
        
          <Route exact path="/login">
              <Login />
            </Route>         
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
