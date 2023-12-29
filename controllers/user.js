import { db } from "../db.js";

export const getEstabelecimentos = (_, res) => {
  const q = "SELECT * FROM estabelecimentos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const creatEstabelicimento = (req, res) => {
  const {
    customer,
    name,
    type,
    cnpj,
    celNumber,
    address,
    addressNumber,
    state,
    city,
    role,
    status,
    login,
    password,
    CEP,
  } = req.body;

  const q = `
    INSERT INTO t_customers
    (customer, name, type, cnpj, celNumber, address, addressNumber, state, city, role, status, login, password, CEP)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    q,
    [
      customer,
      name,
      type,
      cnpj,
      celNumber,
      address,
      addressNumber,
      state,
      city,
      role,
      status,
      login,
      password,
      CEP,
    ],
    (err, result) => {
      if (err) return res.json(err);

      return res.status(201).json({ id: result.insertId });
    }
  );
};

export const getcustomers = (_, res) => {
  const q = "SELECT * FROM t_customers WHERE status = true";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getcustomersByPage = (_, res) => {
  const q =
    "SELECT id, customer, name, type, celNumber, addressNumber, state, city, address, description, iconPerfil, CEP FROM t_customers WHERE status = true";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getCustomerById = (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM t_customers WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json(data[0]);
  });
};

export const updateStatus = (req, res) => {
  const { id, status } = req.body;

  const q = `
    UPDATE t_customers
    SET status = ?
    WHERE id = ?
  `;

  db.query(q, [status, id], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    return res.status(200).json({ message: "Status atualizado com sucesso" });
  });
};

export const getStatus = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT status from  t_customers
    WHERE id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json(data[0].status);
  });
};

export const editCustomer = (req, res) => {
  const {
    id,
    customer,
    name,
    type,
    cnpj,
    celNumber,
    addressNumber,
    state,
    city,
    role,
    address,
    status,
    login,
    password,
    iconPerfil,
    description,
  } = req.body;

  const q = `
    UPDATE t_customers
    SET
      customer = ?,
      name = ?,
      type = ?,
      cnpj = ?,
      celNumber = ?,
      addressNumber = ?,
      state = ?,
      city = ?,
      role = ?,
      address = ?,
      status = ?,
      login = ?,
      password = ?,
      iconPerfil = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    q,
    [
      customer,
      name,
      type,
      cnpj,
      celNumber,
      addressNumber,
      state,
      city,
      role,
      address,
      status,
      login,
      password,
      iconPerfil,
      description,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Estabelecimento não encontrado" });
      }

      return res.status(200).json({ message: "Dados atualizados com sucesso" });
    }
  );
};

export const editProfilePicture = (req, res) => {
  const { id, iconPerfil } = req.body;

  const q = `
  UPDATE t_customers
  SET
  iconPerfil = ?
  WHERE id = ?
  `;

  db.query(q, [iconPerfil, id], (err, result) => {
    if (err) return res.json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    }

    return res.status(200).json({ message: "Dados atualizados com sucesso" });
  });
};

export const getCategorias = (_, res) => {
  const q = "SELECT tipos FROM categorias;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const getProfilePicture = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT iconPerfil FROM t_customers
    WHERE id = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json("Erro interno do servidor");
    }

    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado");
    }

    return res.status(200).json(data[0].iconPerfil);
  });
};

export const getRoles = (_, res) => {
  const q = "SELECT roles FROM permissões;";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const filterCategory = (req, res) => {
  let { name, type } = req.body;

  name = name ? String(name).toLowerCase() : "";
  type = type ? String(type).toLowerCase() : "";

  console.log("name:", name);
  console.log("type:", type);

  let query = `
    SELECT id, customer, address, type, description, iconPerfil
    FROM t_customers
  `;

  if (name !== "") {
    query += ` WHERE LOWER(customer) LIKE '%${name}%' COLLATE utf8_general_ci`;
  }

  if (type !== "") {
    query += ` ${name !== "" ? "AND" : "WHERE"} LOWER(type) = '${type}'`;
  }

  db.query(query, (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });

  console.log("SQL Query:", query);
};

export const getUserByLoginAndPassword = (req, res) => {
  const { login, password } = req.body;

  const query = `
    SELECT id, customer, name, role, iconPerfil
    FROM t_customers
    WHERE login = ? AND password = ?;
  `;

  db.query(query, [login, password], (err, data) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const userData = data[0];
    const { id, customer, name, role, iconPerfil } = userData;

    return res.status(200).json({ id, customer, name, role, iconPerfil });
  });
};
