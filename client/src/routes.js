import { ADMIN_ROUTE, COURSE_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, PROGRAMS_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Admin from './pages/Admin'
import Favorites from './pages/Favorites'
import Auth from './pages/Auth'
import MainPage from './pages/MainPage'
import CoursePage from './pages/CoursePage'

//auth user
export const authRoutes = [
  {
    path: FAVORITES_ROUTE,
    Component: Favorites
  },
]

//admin user 
export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: FAVORITES_ROUTE,
    Component: Favorites
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: PROGRAMS_ROUTE,
    Component: MainPage
  },
  {
    path: COURSE_ROUTE + '/:id',
    Component: CoursePage
  },
]