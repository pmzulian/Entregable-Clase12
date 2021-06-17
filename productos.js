class GenerarProductos {
  constructor() {
    this.productos = [];
  }

  getId() {
    return this.productos.length + 1;
  }

  guardar(producto) {
    this.productos.push(producto);
  }

  listarTodos() {
    return this.productos;
  }

  listarIndividual(id) {
    return this.productos[id - 1];
  }

  borrar(id) {
    const index = this.productos.findIndex((prod) => prod.id == id);
    return this.productos.splice(index, 1);
  }
}

const nuevosProductos = new GenerarProductos();

nuevosProductos.guardar({
  id: nuevosProductos.getId(),
  title: "Computadora Desktop",
  price: 120000,
  thumbnail:
    "https://www.flaticon.es/icono-gratis/ordenador-de-sobremesa_1792525",
});

nuevosProductos.guardar({
  id: nuevosProductos.getId(),
  title: "Televisor SmarTV",
  price: 90000,
  thumbnail: "https://www.flaticon.es/icono-gratis/televisor_4384367",
});

// nuevosProductos.listarIndividual(2)
// nuevosProductos.productos.forEach(index => console.log(index))

// nuevosProductos.borrar(1)

// console.log(nuevosProductos.listarTodos())

// export default GenerarProductos;

module.exports = GenerarProductos;
