import { ProductPreview } from "./ProductPreview";

export function ProductList({ products }) {

    return <section className="products-container">
        {products.map(product => <ProductPreview product={product} />)}
    </section>

}