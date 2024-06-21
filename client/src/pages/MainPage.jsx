import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeMenu from "../components/TypeMenu";
import FormMenu from "../components/FormMenu";
import TownMenu from "../components/TownMenu";
import Courses from "../components/Courses";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import {
  fetchTypes,
  fetchTowns,
  fetchForms,
  fetchCourses,
} from "../http/courseApi";
import { fetchFavorites } from "../http/favoritesApi";

const MainPage = observer(() => {
  const { course, user, favorites } = useContext(Context);
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
    fetchCourses(null, null, null, 1, 100).then((data) => {
      course.setCourses(data.rows);
      course.setTotalCount(data.count);
    });
    if (userId) {
      fetchFavorites(userId)
        .then((data) => {
          favorites.setFavorites(data);
          favorites.setFavoritesArray(data.map((i) => i.courseId));
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, []);

  useEffect(() => {
    fetchCourses(
      course.selectedType.id,
      course.selectedTown.id,
      course.selectedForm.id,
      course.page,
      100
    ).then((data) => {
      course.setCourses(data.rows);
      course.setTotalCount(data.count);
    });
  }, [
    course.selectedType.id,
    course.selectedTown.id,
    course.selectedForm.id,
    course.page,
  ]);

  return (
    <Container className="py-5">
      <Row>
        <Col md={9}>
          <Courses />
        </Col>
        <Col md={3}>
          <TypeMenu />
          <FormMenu />
          <TownMenu />
        </Col>
      </Row>
    </Container>
  );
});

export default MainPage;
