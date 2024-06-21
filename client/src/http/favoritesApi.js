import { $authHost } from "./index";

export const createFavorites = async (userId, courseId) => {
  const { data } = await $authHost.post("api/favorites", {
    userId, courseId
  });
  return data
};

export const fetchFavorites = async (userId) => {
  const { data } = await $authHost.get("api/favorites", {
    params: { userId },
  });
  return data;
};

export const destroyFavorites = async (userId, courseId) => {
  const { data } = await $authHost.post("api/favorites/destroy", {
    userId, courseId
  });
  return data;
};
