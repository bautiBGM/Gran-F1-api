import { Router } from "express";
import TorneoF1Controller from "../controllers/TorneoF1Controller.js";

const router = Router();

const torneoF1Controller = new TorneoF1Controller();

router.post("/:userId",torneoF1Controller.createTorneo);

router.post("/:torneoId/participantes", torneoF1Controller.joinTorneo)

router.get("/",torneoF1Controller.getAllTorneos);

router.get("/:torneoId",torneoF1Controller.getTorneoById);

router.get("/usuario/:userId",torneoF1Controller.getTorneosByUsuario);

router.get("/:torneoId/participantes", torneoF1Controller.getParticipantes)

router.put("/:torneoId",torneoF1Controller.updateTorneo);

router.delete("/:torneoId",torneoF1Controller.deleteTorneo);

export default router;