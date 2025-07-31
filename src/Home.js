import React from "react";
import Category from "./components/Category";
import ProductList from "./components/ProductList";

export default function Home({ products }) {
  return (
    <>
      <Category />
      <ProductList products={products} />
    </>
  );
}
