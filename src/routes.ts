import { Router } from "express";
import { ensureAuthorizateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthorizateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./modules/accounts/authenticateDeliveyman/AuthenticateDeliverymanController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const deliveryController = new CreateDeliveryController();
const createClientController = new CreateClientController();
const updateEndDateController = new UpdateEndDateController();
const findAllAvailableController = new FindAllAvailableController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const createDeliverymanController = new CreateDeliverymanController();
const updateDeliverymanController = new UpdateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();

// Without Authentication
routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

// With Authentication
routes.post("/delivery", ensureAuthorizateClient, deliveryController.handle);
routes.get("/client/deliveries", ensureAuthorizateClient, findAllDeliveriesController.handle);

routes.get("/delivery/available", ensureAuthorizateDeliveryman, findAllAvailableController.handle);
routes.put("/delivery/updateDeliveryman/:id", ensureAuthorizateDeliveryman, updateDeliverymanController.handle);

routes.get("/deliveryman/deliveries", ensureAuthorizateDeliveryman, findAllDeliveriesDeliverymanController.handle);
routes.put("/delivery/updateEndDate/:id", ensureAuthorizateDeliveryman, updateEndDateController.handle);

export { routes };