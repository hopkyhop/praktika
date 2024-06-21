import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row, Col } from "react-bootstrap";
import CourseItem from "./CourseItem";

const Courses = observer(() => {
  const { course, favorites } = useContext(Context);
  const favoritesArray = favorites.favoritesArray;

  return (
    <div>
      <Row className="courses__item">
        <Col className="courses__header" md={6} style={{ textAlign: "start" }}>
          Мeганаправление/Направление
        </Col>
        <Col className="courses__header">Код</Col>
        <Col className="courses__header">Город</Col>
        <Col className="courses__header">Форма обучения</Col>
      </Row>
      {!course.courses.length && (
        <h6>Упс, нет программ по выбранным критериям 🙂</h6>
      )}
      {course.courses.map((course) => (
        <CourseItem
          key={course.id}
          item={course}
          favoritesArray={favoritesArray}
        />
      ))}
    </div>
  );
});

export default Courses;
