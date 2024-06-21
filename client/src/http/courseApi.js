import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data
};

export const createTown = async (town) => {
  const { data } = await $authHost.post("api/town", town);
  return data
};

export const fetchTowns = async () => {
  const { data } = await $host.get("api/town");
  return data
};

export const createForm = async (form) => {
  const { data } = await $authHost.post("api/form", form);
  return data
};

export const fetchForms = async () => {
  const { data } = await $host.get("api/form");
  return data
};

export const createCourse = async (course) => {
  const { data } = await $authHost.post("api/course", course);
  return data
};

export const fetchCourses = async (typeId, townId, formId, page = 1, limit = 100) => {
  const { data } = await $host.get("api/course", {params : {
    typeId, townId, formId, page, limit
  }});
  return data
};

export const fetchOneCourse = async (id) => {
  const { data } = await $host.get(`api/course/${id}`);
  return data
};