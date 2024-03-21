import { Router } from "express";
import Controller from "../controllers/Controller";

/**
 * @constructor
 * @param controller
 */
export default abstract class BaseRoutes<T extends Controller> {
  router: Router;
  controller: T;
  abstract initRoutes(): void;
  constructor( controller: T) {
    this.router = controller.router;
    this.controller = controller;
    this.initRoutes();

  }
}
