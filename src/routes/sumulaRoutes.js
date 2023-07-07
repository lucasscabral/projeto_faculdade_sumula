import { Router } from "express";
import * as sumulaController from "../controllers/sumulaController.js";

const sumulaRouter = Router();

sumulaRouter.post("/players", sumulaController.registerPlayer);
sumulaRouter.get("/players/:id", sumulaController.getPlayerById);

sumulaRouter.post("/teams", sumulaController.registerTeam);
sumulaRouter.get("/teams", sumulaController.getTeams);
sumulaRouter.get("/teams/:id", sumulaController.getTeamById);
sumulaRouter.get("/teams/:id/players", sumulaController.getPlayersByIdTeam);

export default sumulaRouter;