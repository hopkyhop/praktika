import { makeAutoObservable } from "mobx";

export default class CourseStore {
  constructor() {
    this._types = [];
    this._towns = [];
    this._forms = [];
    this._courses = [];
    this._selectedType = {};
    this._selectedForm = {};
    this._selectedTown = {};
    this._page = 1;
    this._totalCount = 0;
    this._limitedCount = 100;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setTowns(towns) {
    this._towns = towns;
  }
  setForms(forms) {
    this._forms = forms;
  }
  setCourses(courses) {
    this._courses = courses;
  }

  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedForm(form) {
    this._selectedForm = form;
  }
  setSelectedTown(town) {
    this._selectedTown = town;
  }

  get types() {
    return this._types;
  }
  get towns() {
    return this._towns;
  }
  get forms() {
    return this._forms;
  }
  get courses() {
    return this._courses;
  }

  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }

  get selectedType() {
    return this._selectedType;
  }
  get selectedTown() {
    return this._selectedTown;
  }
  get selectedForm() {
    return this._selectedForm;
  }
}
