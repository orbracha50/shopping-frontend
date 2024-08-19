import { useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"
import { useEffect } from "react"
import { ProductList } from "../cmps/ProductsList"

 export function HomePage(){
    const user = useSelector((storeState) => storeState.userModule.user)
    const products = useSelector((storeState) => storeState.productModule.products)
    useEffect(() => {
        loadProducts()
          .catch(err => {
            showErrorMsg('Cannot load stations!')
            throw err
          })
       
      }, [])
      console.log(products)
    if(!products) return
    return <section >
       <ProductList products={products}/>
    </section>
 }