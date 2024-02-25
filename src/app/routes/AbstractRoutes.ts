import { Router } from "express";
import Controller from "../controllers/Controller";

export default abstract class AbstractRoutes<T extends Controller> {
  router: Router;
  controller: T;
  abstract initRoutes(): void;
  constructor(router: Router, controller: T) {
    this.router = router;
    this.controller = controller;
  }
}
