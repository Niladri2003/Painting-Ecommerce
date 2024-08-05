import { useContext } from "react"
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext"
import ProductHd from "../components/ProductHd";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import RelatedProduct from "../components/RelatedProduct";



const Product = () => {
  const {all_products} = useContext(ShopContext);
  const {productId}= useParams();
  // console.log(productId)
  const product = all_products.find((e)=> e.id === Number(productId));
  // console.log(product)
  if(!product){
    return <div>Product not found!</div>
  }

  return (
    <section className="max_padd_container py-28">
      <div>
        <ProductHd product={product}/>
        <ProductDisplay product={product} />
        <ProductDescription/>
        <RelatedProduct/>
      </div>
    </section>
  )
}

export default Product