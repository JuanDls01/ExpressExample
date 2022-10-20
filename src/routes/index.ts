import { Router } from "express";
import productRoute from "./product.routes";

const mainRouter = Router();

mainRouter.use('/product', productRoute);

export default mainRouter;