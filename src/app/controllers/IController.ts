import { Router } from "express";
import Service from "@app/services/Service";
export default interface IController {
  router: Router;
  prefix: string;
}
