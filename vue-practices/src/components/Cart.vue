<template>
  <div class="cart">
    <h2>购物车清单</h2>
    <p v-show="!products.length"><i><b>请添加产品到购物车</b></i></p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>合计： {{ total }} 元</p>
    <p><button :disabled="!products.length" @click="checkout(products)">提交订单</button></p>
    <p v-show="checkoutStatus">提交 {{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    }),
    // ...mapGetters({
    //   products: 'cart/cartProducts',
    //   total: 'cart/cartTotalPrice'
    // }),
    // checkoutStatus() {
    //   return this.$store.state.cart.checkoutStatus
    // }
  },
  methods: {
    ...mapActions('cart', ['checkout'])
  },
}
</script>