<template>
  <div>
    <div class="fixPage" @click="goCheckout">
      <img class="img-fluid" src="../assets/Cart.png" alt="cart">
      <span class="badge badge-pill badge-danger transform-num"
      v-if="!cartNum == 0">{{cartNum}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        cart: [],
        cartNum:0,
      }
    },
    methods: {
      getCart() {
        const vm = this
        vm.cart = localStorage.cartList ? JSON.parse(localStorage.cartList) : []
        vm.cartNum = vm.cart.length;
      },
      goCheckout(){
        const vm = this;
        if(vm.cartNum == 0){
          alert('購物車是空的喔 請選購商品吧')
        }else{
          this.$router.push('/cartList');
        }
      },
    },
    created() {
      this.getCart();
      const vm = this;
      vm.$bus.$on('updateCart',()=>{
        vm.getCart();
      });
    },
  }
</script>

<style lang="scss" scoped>
  .fixPage {
    position: fixed;
    right: 50px;
    bottom: 60px;
    height: 80px;
    width: 80px;
    z-index: 3000;
    cursor: pointer;

  }

  .transform-num {
    transform: translate(50px, -80px);
    font-size: 18px;
  }
</style>