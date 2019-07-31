<template>
  <div>
    <shoppingCart/>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container mb-5 bg-self">
      <div class="row">
        <div class="col-md-8">
          <ol class="breadcrumb" style="background:none;">
            <li class="breadcrumb-item">
              <router-link to="/" >首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shopping" >商品專區</router-link>
            </li>
            <li class="breadcrumb-item">
              {{ product.title }}
            </li>
          </ol>
        </div>
        <div class="col-md-4 text-center">
        </div>
      </div>

      <div class="row">
        <div class="col-md-7">
          <img :src="product.img_url" class="img-fluid rounded" alt="img">
        </div>
        <div class="col-md-5 bg-blue">
          <h3 class="text-white">{{product.title}} ({{ product.code }})<div class="pro-title text-center ml-3"> {{product.category}}</div>
          </h3>
          <h5 class="my-4 mylh text-white">{{product.description}}</h5>
          <div class="row">
            <div class="col-4">
              <select style="width: 150px;" class="form-control" v-model="optionType">
                <option value="A4-SWATCH">A4-SWATCH</option>
                <option value="handout">handout</option>
                <option value="yard">yard</option>
              </select>
            </div>
            <div class="col-4">
              <select style="width: 100px;" class="form-control" v-model="optionNum">
                <option v-for="(i, index) in 8" :key="`type-${index}`" :value="i">{{ i }} unit</option>
              </select>
            </div>
            <div class="col-4"></div>
          </div>
          <div class="my-5 d-flex justify-content-end align-items-baseline">
              <button type="button" class="btn btn-info" @click="addtoCart(product,optionNum)">Add to cart</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shoppingCart from '../../components/shoppingCart.vue';
  import {db} from '@/firebase.js'

  
  export default {
    components:{
      shoppingCart,
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        product: {},
        optionNum: '1',
        optionType: 'A4-SWATCH',
      }
    },
    methods: {
      addtoCart(item, qty = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/tingwankuo/cart`;
        const vm = this;
        vm.isLoading = true;
        const cart = {
          data: {
            product_id: item.id,
            qty,
          },
        };
        this.$http.post(api, cart).then((res) => {
          let masg = item.title + res.data.message;
          // vm.$bus.$emit('messsagePush', masg, 'success');
          vm.$notify({
            title: '成功',
            message: masg,
            type: 'success'
          });
          vm.$bus.$emit('updateCart');
          vm.isLoading = false;
        });
      },
    },
    created() {
      const vm = this;
      vm.isLoading = true;
      db.ref('huge-products/' + vm.$route.params.productId).once('value', function (snapshot) {
        vm.isLoading = false
        vm.product = snapshot.val()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .bg-self {
    color: black;
    min-height: 80vh;
  }

  .pro-title {
    background: rgb(250, 196, 134);
    display: inline-block;
    font-size: 20px;
    width: 70px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    color: rgb(66, 80, 71);
  }
  .bg-blue{
    background: #36679b;
    border-radius: 5px;
    padding-top: 30px;
  }
  .mylh{
    line-height: 40px;
  }
</style>