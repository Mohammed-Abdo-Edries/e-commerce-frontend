import { useEffect, useState } from "react";
import { useShopContext } from "../context1/ShopContext";
import ProductItem from "./productItem";

const RelatedProducts = ({ currentId,category, subCategory }) => {
  const { products } = useShopContext();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      if (currentId) {
          productsCopy = productsCopy.filter((item) => item._id !== currentId);
        }
      // console.log(productsCopy);
      // console.log(currentId);
      setRelated(productsCopy.slice(0, 5));
      console.log(related);
    }
    
  }, [products,category, subCategory, currentId]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <div>
          Related Products
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            imgURL={item.imgURL}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedProducts;
