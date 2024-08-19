
import { httpService } from '../http.service'


export const productService = {
    queryProducts,
    getById,
    save,
    remove,
  
}

async function queryProducts() {
    return await httpService.get(`product`)
}

async function getById(productId) {
    return await httpService.get(`product/${productId}`)
}



async function remove(productId) {
    return await httpService.delete(`product/${productId}`)
}

async function save(product) {
    var savedProduct
    if (product._id) {
        savedProduct = await httpService.put(`product/${product._id}`, product)
    } else {
        savedProduct = await httpService.post('product', product)
    }
    return savedProduct
}
