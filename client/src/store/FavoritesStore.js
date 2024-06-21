import { makeAutoObservable } from "mobx";

export default class FavoritesStore {
  constructor() {
    this._favorites = {};
    this._favoritesArray = [];
    makeAutoObservable(this);
  }

  setFavorites(favorites) {
    this._favorites = favorites;
  }
  setFavoritesArray(favoritesArray) {
    this._favoritesArray = favoritesArray;
  }

  get favorites() {
    return this._favorites;
  }
  get favoritesArray() {
    return this._favoritesArray;
  }
}
