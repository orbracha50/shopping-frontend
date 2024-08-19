export function ProductPreview({product}){

    return <article className="prouduct-item">
        <img src={product.img} alt="" />
        <h1>category: {product.name}</h1>
        <p>price: {product.price}$</p>
    </article>
}