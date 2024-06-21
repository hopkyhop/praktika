import React from "react";
import { Switch, Route } from "react-router-dom";
import { authRoutes, publicRoutes, adminRoutes } from "../routes";
import { Redirect } from "react-router-dom";
import { PROGRAMS_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "../index";

const AppRouter = () => {
  const {user} = useContext(Context)
  return (
    <Switch>
      {user.isAuth === true && authRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} key={path} exact/>
      ))}
      {user.role === 'ADMIN' && adminRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} key={path} exact/>
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} key={path} exact/>
      ))}
      <Redirect to={PROGRAMS_ROUTE}/>
    </Switch>
  );
};

export default AppRouter;
