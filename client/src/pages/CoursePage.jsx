import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import TypeIcon from "../assets/typeIcons/TypeIcon";
import HeartEmptyIcon from "../assets/icons/HeartEmptyIcon";
import { Context } from "..";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  fetchTypes,
  fetchTowns,
  fetchForms,
  fetchOneCourse,
} from "../http/courseApi";
import { observer } from "mobx-react-lite";
import { fetchFavorites } from "../http/favoritesApi";
import HeartFullIcon from "../assets/icons/HeartFullIcon";
import { createFavorites, destroyFavorites } from "../http/favoritesApi";

const CoursePage = observer(() => {
  const [item, setItem] = useState({ info: [] });
  const { id } = useParams();

  const { course, user, favorites } = useContext(Context);
  const types = course.types;
  const towns = course.towns;
  const forms = course.forms;
  const favoritesArray = favorites.favoritesArray;

  const userId = user.user.id;

  useEffect(() => {
    fetchTypes().then((data) => {
      course.setTypes(data);
    });
    fetchTowns().then((data) => {
      course.setTowns(data);
    });
    fetchForms().then((data) => {
      course.setForms(data);
    });
    fetchOneCourse(id).then((data) => setItem(data));
    if (userId) {
      fetchFavorites(userId)
        .then((data) => {
          favorites.setFavorites(data);
          favorites.setFavoritesArray(data.map((i) => i.courseId));
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, []);

  const addFavoriteItem = () => {
    createFavorites(user.user.id, item.id).then((data) => {
      favorites.setFavoritesArray([...favorites.favoritesArray, data.courseId]);
    });
  };

  const removeFavoriteItem = () => {
    destroyFavorites(user.user.id, item.id).then((data) => {
      favorites.setFavoritesArray(
        favorites.favoritesArray.filter((i) => i !== item.id)
      );
    });
  };

  if (!item) {
    return (
      <Container className="py-5">
        <h6>Упс, нет такой программы 🙂</h6>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="page-container">
        <div className="position-relative">
          <TypeIcon id={item.typeId} />
          <h5 className="course__page-type pt-2">
            {types.length && item.name && types[item.typeId - 1].name}
          </h5>
          {favoritesArray.length && favoritesArray.includes(Number(id)) ? (
            <button className="heart__btn" onClick={removeFavoriteItem}>
              <HeartFullIcon />
            </button>
          ) : (
            <button className="heart__btn" onClick={addFavoriteItem}>
              <HeartEmptyIcon />
            </button>
          )}
        </div>
        <Row>
          <h3 className="course__page-title mt-3 mb-5">{item.name}</h3>
        </Row>
        <ul className="course__page-list">
          <li className="course__page-item">
            <h3 className="course__page-subtitle">Код</h3>
            <h3 className="course__page-text">{item.code}</h3>
          </li>
          <li className="course__page-item">
            <h3 className="course__page-subtitle">Форма обучения</h3>
            <h3 className="course__page-text">
              {forms.length && item.name && forms[item.formId - 1].name}
            </h3>
          </li>
          <li className="course__page-item">
            <h3 className="course__page-subtitle">Город</h3>
            <h3 className="course__page-text">
              {towns.length && item.name && towns[item.townId - 1].name}
            </h3>
          </li>
          {item.info.map((descr) => (
            <li className="course__page-item" key={descr.id}>
              <h3 className="course__page-subtitle">{descr.title}</h3>
              <h3 className="course__page-text">{descr.description}</h3>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
});

export default CoursePage;
