import AbstractRoutes from "@/app/routes/AbstractRoutes";
import ClientController from "../controllers/ClientController";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import ClientRequest from "../middlewares/ClientRequest";
import InfoRequest from "@source/middlewares/InfoRequest";
import {Request, Response} from "express";
import ImageRequest from "@file/middlewares/ImageRequest";
import DocumentRequest from "@file/middlewares/DocumentRequest";

export default class ClientRoutes extends AbstractRoutes<ClientController> {

    constructor() {
        super(new ClientController());
    }

    initRoutes(): void {
        this.router
            .route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getClients),
                (req: any, res: any) => this.controller.getClients(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createClients),
                ClientRequest.upsertClientRequest(),
                ClientRequest.validate,
                (req: any, res: any) => this.controller.createClient(req, res)
            );

        this.router.post("/:id/info",
            RoleMiddleware.hasPermission(PermissionEnums.createClients),
            InfoRequest.upsertInfoRequest(),
            InfoRequest.validate,
            (req: Request, res: Response) => this.controller.setClientInfo(req, res)
        )
        this.router.post("/:id/profile",
            ImageRequest.createImageRequest(),
            ImageRequest.validate,
            (req: Request, res: Response) => this.controller.setProfilePhoto(req, res)
        )
        this.router.post("/:id/images",
            ImageRequest.createImageRequest(),
            ImageRequest.validate,
            (req: Request, res: Response) => this.controller.setClientImages(req, res)
        )
        this.router.post("/:id/documents",
            DocumentRequest.createDocumentRequest(),
            DocumentRequest.validate,
            (req: Request, res: Response) => this.controller.setClientDocuments(req, res)
        )

        this.router
            .route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getClients),
                (req: any, res: any) => {
                    return this.controller.findClient(req, res)
                }
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editClients),
                ClientRequest.upsertClientRequest(),
                ClientRequest.requireIdRequest(),
                ClientRequest.validate,
                (req: any, res: any) => this.controller.updateClient(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteClients),
                (req: any, res: any) => this.controller.deleteClient(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: any, res: any) => this.controller.restoreClient(req, res)
            );
    }
}

/**
 * @swagger
 *  components:
 *   schemas:
 *    Client :
 *      type : object
 *      properties :
 *        name :
 *         type : string
 *        lastname :
 *         type : string
 *      required :
 *        - name
 *        - lastname
 * @swagger
 *  /clients/:
 *     get:
 *       summary: List all clients
 *       parameters:
 *         - $ref: "#/parameters/search"
 *       responses:
 *         200:
 *           $ref: "#/responses/200"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         500:
 *           $ref: "#/responses/500"
 *       operationId: clients
 *
 *     post:
 *       summary: Create new client
 *       operationId: clients-create
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Client"
 * /clients/{id}:
 *     get:
 *       summary: Get an especific client by id or code
 *       operationId: clients-show
 *       responses:
 *         200:
 *           $ref: "#/responses/200"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         500:
 *           $ref: "#/responses/500"
 *
 *     put:
 *       summary: Update existing client
 *       operationId: clients-update
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *
 *     delete:
 *       summary: Soft delete client data
 *       operationId: clients-delete
 *       responses:
 *         200:
 *           $ref: "#/responses/200"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         404:
 *           $ref: "#/responses/404"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *     post:
 *       summary: Restore deleted client
 *       operationId: clients-restore
 *       responses:
 *         200:
 *           $ref: "#/responses/200"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *
 * /clients/{id}/info:
 *     post:
 *       summary: Create or update client info
 *       operationId: client.info
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/schemas/Info"
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *
 *
 * /clients/{id}/profile:
 *     post:
 *       summary: Set or update client profile image
 *       operationId: client.profile
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     $ref: "#/schemas/Image"
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *
 * /clients/{id}/images:
 *     post:
 *       summary: Add one or more images to client
 *       operationId: client.images
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     $ref: "#/schemas/Image"
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *
 *
 * /clients/{id}/documents:
 *     post:
 *       summary: Add one or more documents to client
 *       operationId: client.documents
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     $ref: "#/schemas/Document"
 *       responses:
 *         201:
 *           $ref: "#/responses/201"
 *         401:
 *           $ref: "#/responses/401"
 *         403:
 *           $ref: "#/responses/403"
 *         422:
 *           $ref: "#/responses/422"
 *         500:
 *           $ref: "#/responses/500"
 *       parameters:
 *         - name: id
 *           schema:
 *             type: integer
 *           in: path
 *           required: true
 *
 *
 */