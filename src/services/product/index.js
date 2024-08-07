const { DEV, VITE_LOCAL } = import.meta.env

import { productService as local } from './product.service.local'
import { productService as remote } from './product.service.remote'

const service = VITE_LOCAL === 'true' ? local : remote
export const productService = { ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local
console.log(productService)
if (DEV) window.productService = productService
