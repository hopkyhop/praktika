import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Context } from "..";
import { useHistory } from "react-router-dom";
import { COURSE_ROUTE } from "../utils/consts";
import HeartEmptyIcon from "../assets/icons/HeartEmptyIcon";
import { observer } from "mobx-react-lite";
import HeartFullIcon from "../assets/icons/HeartFullIcon";
import { createFavorites, destroyFavorites } from "../http/favoritesApi";

const CourseItem = observer(({ item, favoritesArray }) => {
  const { course, user, favorites } = useContext(Context);
  const types = course.types;
  const towns = course.towns;
  const forms = course.forms;

  const history = useHistory();

  const addFavoriteItem = () => {
    createFavorites(user.user.id, item.id).then((data) => {
      favorites.setFavoritesArray([...favorites.favoritesArray, data.courseId])
    });
  };

  const removeFavoriteItem = () => {
    destroyFavorites(user.user.id, item.id).then((data) => {
      favorites.setFavoritesArray(favorites.favoritesArray.filter(i => i !== item.id))
    });
  };

  return (
    <Row className="courses__item course">
      <Col className="courses__text" style={{ textAlign: "start" }} md={6}>
        <p style={{ fontSize: 11 }}>
          {types.length && types[item.typeId - 1].name}
        </p>
        <p
          className="courses__title"
          onClick={() => history.push(COURSE_ROUTE + "/" + item.id)}
        >
          {item.name}
        </p>
      </Col>
      <Col className="courses__text">{item.code}</Col>
      <Col className="courses__text">
        {towns.length && towns[item.townId - 1].name}
      </Col>
      <Col className="courses__text">
        {forms.length && forms[item.formId - 1].name}
      </Col>
      {favoritesArray.length && favoritesArray.includes(item.id) ? (
        <button className="heart__btn" onClick={removeFavoriteItem}>
          <HeartFullIcon />
        </button>
      ) : (
        <button className="heart__btn" onClick={addFavoriteItem}>
          <HeartEmptyIcon />
        </button>
      )}
    </Row>
  );
});

export default CourseItem;
