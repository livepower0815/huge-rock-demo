<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 text-center ">
          <span class="h4 carts_title">1.Carts detail</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">2.Check out</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">3.Order completed！</span>
        </div>
      </div>
      
      <div class="row mt-5">
        <div class="col-md-8 text-primary">
          <h3 class="text-center black-50 bg-primary text-light">Carts content</h3>
          <div class="list-item row" v-for="(item, idx) in carts" :key="idx">
            <div class="col-md-5 d-flex align-items-center">
              <div class="img-item" :style="`background-image: url(${item.product_img_url});`"></div>
              <div class="d-inline-block">
                <p class="h4">{{item.product_name}}</p>
              </div>  
            </div>

            <div class="col-md-4 d-flex align-items-center">
              <div class="d-inline-block h5">
                {{item.product_type}} 
              </div>
            </div>

            <div class="col-md-3 d-flex align-items-center">
              <div class="ml-auto">
                <div class="d-inline-block h5">
                  Qty:  {{item.product_qty}} 
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm ml-5" @click="removeCart(item.product_name, idx)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-4">
          <div class="bg-primary text-white px-4 bdr">
            <h3 class="myTitle">Summary</h3>
            <div class="d-flex justify-content-between my-4">
              <span class="h4">Count</span>
              <span class="h4">{{carts.length}} items</span>
            </div>
            <div class="text-right pb-4">
              <button type="button" class="btn btn-info" @click="goCheckout">Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        carts: [],
        isLoading: false,
        fullPage: true,
        coupon_code: '',
      };
    },
    methods: {
      getCart() {  
        const vm = this
        vm.carts = localStorage.cartList ? JSON.parse(localStorage.cartList) : []
      },
      removeCart(product_name, index) {
        const vm = this
        vm.carts.splice(index, 1)
        localStorage.cartList = JSON.stringify(vm.carts)
        vm.$notify({
          title: '刪除成功',
          message: `已刪除${product_name}`,
          type: 'success'
        });
      },
      addCouponCode() {
        const api = `${process.env.VUE_APP_APIPATH}/api/tingwankuo/coupon`;
        const vm = this;
        vm.isLoading = true;
        let couponCode = {
          data: {
            code: vm.coupon_code
          }
        };
        this.$http.post(api, couponCode).then((res) => {
          // vm.$bus.$emit('messsagePush', res.data.message, 'success');
          console.log(res.data.success);
          if (res.data.success == true) {
            vm.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            });
          } else if (res.data.success == false) {
            vm.$notify({
              title: '失敗',
              message: res.data.message,
              type: 'error'
            });
          }

          vm.isLoading = false;
          this.getCart();
        });
      },
      goCheckout() {
        this.$router.push('/checkout')
      },
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },
    created() {
      this.getCart();
    },
  }
</script>

<style lang="scss" scoped>
  #bg-gray {
    background: rgb(234, 234, 234);
  }

  .black-50 {
    height: 60px;
    border-radius: 3px;
    line-height: 60px;
  }

  .list-item {
    border-bottom: 2px solid rgb(218, 212, 212);
    padding: 15px 10px;
  }

  .img-item {
    height: 110px;
    width: 110px;
    display: inline-block;
    background-position: center center;
    background-size: cover;
    margin-right: 40px;
  }

  .myTitle {
    text-align: center;
    padding: 13px 0;
    border-bottom: 2px solid rgb(255, 255, 255);
  }

  .bdr {
    border-radius: 3px;
  }

  .carts_title {
    color: white;
    background: #1aac98;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .pay_title {
    color: white;
    background: #36679b;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .no_title {
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }
</style>