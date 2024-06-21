import React, { useContext } from "react";
import { Context } from "..";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ADMIN_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, PROGRAMS_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Logo from "../assets/icons/Logo";
import Title from "../assets/icons/Title";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "../assets/icons/FavoriteIcon";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setRole('USER');
    localStorage.removeItem("token");
  };
  return (
    <Navbar bg="light" data-bs-theme="light" className="navbar">
      <Container>
        <div>
          <NavLink to={PROGRAMS_ROUTE} className="me-1">
            <Logo />
          </NavLink>
          <NavLink to={PROGRAMS_ROUTE}>
            <Title />
          </NavLink>
        </div>
        {user.isAuth ? (
          <Nav className="ml-auto">
            {user.role === 'ADMIN' && (
              <Button variant="light" onClick={() => history.push(ADMIN_ROUTE)}>
                Админ-панель
              </Button>
            )}
            <Button variant="light" className="ms-4" onClick={() => logout()}>
              Выйти
            </Button>
            <Button className="p-0 ms-4" onClick={() => history.push(FAVORITES_ROUTE)}> 
              <FavoriteIcon/>
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="light" onClick={() => history.push(LOGIN_ROUTE)}>
              Войти
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
