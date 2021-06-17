const express = require("express");
const router = express.Router();

const productos = require("../api/producto");

//=====================================================================
router.post("/productos/guardar", (req, res) => {
  productos.guardar({
    ...req.body,
    id: productos.getId(),
  });
  res.send(req.body);
  //res.redirect("/productos/vista");
});

router.get("/productos/listar", (req, res) => {
  const todos = productos.listarTodos();
  if (todos.length > 0) {
    res.send(todos);
  } else {
    res.json({ error: "No hay productos cargados" });
  }
});

router.get("/productos/listar/:id", (req, res) => {
  let found = productos.listarIndividual(req.params.id);
  console.log(found);
  if (found) {
    res.send(found);
  } else {
    res.json({ error: "No hay producto con el id indicado" });
  }
});

//=====================================================================
//Creamos la estructura con express.router
router.put("/productos/actualizar/:id", (req, res) => {
  const ubicacion = req.params.id;
  const actualizar = req.body;

  if (ubicacion <= productos.productos.length) {
    productos.productos = productos.productos.map((p) => {
      if (p.id == ubicacion) {
        p = Object.assign(p, actualizar);
      }
      return p;
    });
    res.json({
      ...productos.productos,
    });
  } else {
    res.send("No hay producto con el índice " + ubicacion);
  }
});

router.delete("/productos/borrar/:id", (req, res) => {
  let id = req.params.id;

  let productoBuscado = productos.productos.find((p) => {
    return p.id == id;
  });

  if (productoBuscado) {
    let borrado = productos.borrar(id);

    res.send(borrado);
  } else {
    res.send("No exite el produco");
  }
});

module.exports = router;