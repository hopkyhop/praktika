import React, { useContext, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, PROGRAMS_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useHistory } from "react-router-dom";

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);
  const history = useHistory()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      user.setRole(data.role);
      history.push(PROGRAMS_ROUTE)
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card bg="primary" style={{ width: 600 }} className="p-4">
        <Card.Header>{isLogin ? "Авторизация" : "Регистрация"}</Card.Header>
        <Form className="d-flex flex-column">
          <Form.Control
            placeholder="Введите email"
            className="mt-3"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            placeholder="Введите пароль"
            className="mt-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between align-items-end mt-3 pl-3 pr-3">
            {isLogin ? (
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{ color: "white", textDecoration: "none" }}
              >
                Нет аккаунта
              </NavLink>
            ) : (
              <NavLink
                to={LOGIN_ROUTE}
                style={{ color: "white", textDecoration: "none" }}
              >
                Есть аккаунт
              </NavLink>
            )}
            <Button variant="light" onClick={click}>
              {isLogin ? "Войти" : "Создать аккаунт"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
