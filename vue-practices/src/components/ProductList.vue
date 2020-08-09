<template>
	<ul>
		<li v-for="product in products" :key="product.id">
			{{ product.title }} - {{ product.price }}
			<br />
			<button :disabled="!product.inventory" @click="addProductToCart(product)">
				加入购物车
			</button>
		</li>
	</ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ProductList',
  computed: {
    ...mapState({
      products: state => state.products.all
    })
    // products() {
    //   return this.$store.state.products.all
    // }
  },
  created() {
    // this.$store.dispatch('products/getAllProducts')
    this.getAllProducts()
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('products', ['getAllProducts'])
    // addProductToCart(product) {
    //   this.$store.dispatch('addProductToCart', product)
    // }
  }
}
</script>
