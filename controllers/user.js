import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM api_resource";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const insertDados = (req, res) => {
  const bancos = req.body;

  for (let i = 0; i < bancos.length; i++) {
    const { registeredName, endpoints, logoSrc } = bancos[i];
    const q = `INSERT INTO api_resource (registeredName, endpoints, logoSrc) VALUES ('${registeredName}', '${endpoints}', '${logoSrc}')`;
    console.log(q);

    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Erro ao inserir dados no banco de dados." });
      }
    });
  }

  return res.status(200).json({ message: "Dados inseridos com sucesso." });
};
