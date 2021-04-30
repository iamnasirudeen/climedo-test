import { Application, Router } from "express";
import Department from "./department.route";

const getRoutes = (app: Application) => {
  const routes: Array<Router> = [Department];
  routes.map((route) => app.use(route));
};

export default getRoutes;
