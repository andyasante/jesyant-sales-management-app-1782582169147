import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  export const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return { products, addProduct, removeProduct, updateProduct };
};