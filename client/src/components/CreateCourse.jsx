import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import {
  fetchTypes,
  fetchTowns,
  fetchForms,
  createCourse,
} from "../http/courseApi";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const CreateCourse = observer(({ show, onHide }) => {
  const { course } = useContext(Context);

  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState({});
  const [form, setForm] = useState({});
  const [town, setTown] = useState({});

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) =>
        i.number === number
          ? {
              ...i,
              [key]: value,
            }
          : i
      )
    );
  };

  const addCourse = () => {
    if (!name || !code || !type.id || !form.id || !town.id) {
      alert("Заполните все поля");
      return;
    }

    const data = {}
    data.name = name;
    data.code = code;
    data.typeId = type.id;
    data.formId = form.id;
    data.townId = town.id;
    data.info = JSON.stringify(info);
    console.log(data);
    createCourse(data).then((data) => {
      onHide();
    });
  };

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
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Новый курс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Название курса"
            className="mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            placeholder="Код"
            className="mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" style={{ minWidth: 300 }}>
              {type.name || "Меганаправление"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {course.types.map((type) => (
                <Dropdown.Item key={type.id} onClick={() => setType(type)}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" style={{ minWidth: 300 }}>
              {form.name || "Форма обучения"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {course.forms.map((form) => (
                <Dropdown.Item key={form.id} onClick={() => setForm(form)}>
                  {form.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" style={{ minWidth: 300 }}>
              {town.name || "Город"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {course.towns.map((town) => (
                <Dropdown.Item key={town.id} onClick={() => setTown(town)}>
                  {town.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <div className="d-flex align-items-center mb-3">
            <Button variant="light" onClick={addInfo} style={{ minWidth: 300 }}>
              Добавить характеристики курса
            </Button>
            <p className="form-prompt">
              Вы можете добавить описание курса, вступительные испытания,
              количество мест, проходные баллы и тд.
            </p>
          </div>

          {info.map((i) => (
            <Row key={i.number} className="my-3 ps-4">
              <Col md={4}>
                <Form.Control
                  placeholder="Название характ-ки"
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Описание характ-ки"
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="light"
                  onClick={() => {
                    removeInfo(i.number);
                  }}
                >
                  удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={addCourse}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCourse;
