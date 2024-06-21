import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import CourseStore from "./store/CourseStore";
import "./index.css";
import FavoritesStore from "./store/FavoritesStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      course: new CourseStore(),
      favorites: new FavoritesStore()
    }}
  >
    <App />
  </Context.Provider>
);
