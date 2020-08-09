/**
 * mock client-server processing
 */

const _products = [
  {
    id: 1, title: '华为 Mate 40', price: 8999, inventory: 2
  },
  {
    id: 2, title: '小米10', price: 3999, inventory: 0
  },
  {
    id: 3, tilte: 'OPPO R20', price: 3999, inventory: 5
  }
]

export default {
  getProducts(cb) {
    setTimeout(() => {
      return cb(_products)
    }, 1000);
  },
  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      Math.random() > 0.5 ? cb() : errorCb()
    }, 1000);
  }
}