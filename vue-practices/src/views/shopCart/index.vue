<template>
  <div>
    <h2>产品列表</h2>
    <ProductList />
    <Cart />
  </div>
</template>

<script>
import ProductList from '../../components/ProductList'
import Cart from '../../components/Cart'
export default {
  name: 'ShopCart',
  components: {
    ProductList,
    Cart
  }
}
</script>