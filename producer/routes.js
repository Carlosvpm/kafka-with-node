import express from "express";
import { sendMessage } from "./index.js";
const router = express.Router();

router.post("/certification", (request, res) => {
  console.log(request.body);
  try {
    sendMessage(`Gerar certificado de ${request.body.name}!`);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
