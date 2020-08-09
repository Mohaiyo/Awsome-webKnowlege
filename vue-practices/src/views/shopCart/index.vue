<template>
  <div>
    <h1>购物车示例</h1>
    <p>账号： {{ email }}</p>
    <hr>
    <h2>产品</h2>
    <ProductList />
    <hr>
    <Cart />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductList from '../../components/ProductList'
import Cart from '../../components/Cart'
export default {
  name: 'ShopCart',
  components: {
    ProductList,
    Cart
  },
  computed: {
    ...mapState({email: state => state.userInfo.email })
  },
}
</script>