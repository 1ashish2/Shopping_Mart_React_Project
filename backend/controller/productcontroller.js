import { productData } from "../data/productData.js";

export const getProductLists = (req, res) => {
  res.send(productData);
};

export const getProductDetail = (req, res) => {
  let id = req.params.id;
  const singleProduct = productData.filter((product) => product.id === id);
  console.log("dddRES", res);
  res.send(singleProduct);
};
