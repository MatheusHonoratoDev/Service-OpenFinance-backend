import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use("/", userRoutes);

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
