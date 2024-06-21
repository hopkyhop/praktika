import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { fetchFavorites } from "../http/favoritesApi";
import { observer } from "mobx-react-lite";
import { fetchCourses } from "../http/courseApi";
import { Link } from "react-router-dom";
import { COURSE_ROUTE } from "../utils/consts";

const Favorites = observer(() => {
  const { user, favorites, course } = useContext(Context);
  const userId = user.user.id;

  useEffect(() => {
    fetchFavorites(userId).then((data) => favorites.setFavorites(data));
    fetchCourses(null, null, null, 1, 100).then((data) => {
      course.setCourses(data.rows);
      course.setTotalCount(data.count);
    });
  }, []);

  return (
    <Container className="py-5">
      <div className="page-container">
        <h3 className="course__page-title mb-3">Избранное</h3>
        <div className="ps-3">
          {favorites.favorites.length ? (
            favorites.favorites.map((item) => (
              <Link
                to={COURSE_ROUTE + "/" + item.courseId}
                className="favorites-item"
                key={item.courseId}
              >
                {course.courses[item.courseId - 1].name}
              </Link>
            ))
          ) : (
            <h6>Упс, нет избранных программ 🙂</h6>
          )}
        </div>
      </div>
    </Container>
  );
});

export default Favorites;
