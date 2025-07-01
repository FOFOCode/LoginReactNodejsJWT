import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getProducts } from "../services/productService";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const dataProducts = await getProducts();
      setProducts(dataProducts);
    } catch (error) {
      console.log("Error al obtener los productos ", error);
      alert("Error al obtener los productos ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Productos</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
