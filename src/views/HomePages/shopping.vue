<template>
  <div class="bg-set">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <shoppingCart />
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 text-center">
          <div class="pro-title">商品專區</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-9">
          <ol class="breadcrumb" style="background:none;">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-white">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shopping" class="text-white">商品專區</router-link>
            </li>
          </ol>
        </div>
        <div class="col-md-3">
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="filterData" placeholder="請輸入商品名稱" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-light" type="button" id="button-addon2" @click="filterTitle"><i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-sm-5">
      <div class="col-md-2">
        <div class="text-center side-list" @click="filterPro('')">全部商品</div>
        <div class="text-center side-list" @click="filterPro('運動')">運動</div>
        <div class="text-center side-list" @click="filterPro('登山')">登山</div>
        <div class="text-center side-list" @click="filterPro('休閒')">休閒</div>
        <div class="text-center side-list" @click="filterPro('防水')">防水</div>
      </div>
      <div class="col-md-10 text-dark">
        <div class="row my-4">
          <div class="col-md-3 mb-3" v-for="(item, index) in filterProducts" :key="index">
            <div class="card border-0 shadow-sm mycard">
              <div class="showCate">
                {{ item.category }}
              </div>
              <div class="imgContainer">
                <div class="point my-img" @click="goDetail(item.id)" :style="{backgroundImage:`url(${item.imageUrl})`}">
                </div>
              </div>
              <div class="card-body">
                <span class="badge badge-primary float-right ml-2">{{ item.description }}</span>
                <h5 class="card-title">
                  <h5 class="text-dark">{{ item.title }}</h5>
                </h5>
                <div class="alert alert-info" role="alert">
                  {{ item.content }}
                </div>
                <!-- <p class="card-text">{{ item.content }}</p> -->
                <div class="d-flex justify-content-between align-items-baseline">
                  <!-- <div class="h5">2,800 元</div> -->
                  <!-- <del class="h6">原價 {{ item.origin_price }} 元</del>
                  <div class="h5">特惠 <span class="text-danger">{{ item.price }}</span> 元</div> -->
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="goDetail(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-info btn-sm ml-auto" @click="addtoCart(item)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import shoppingCart from '../../components/shoppingCart.vue';
  export default {
    components: {
      shoppingCart,
    },
    data() {
      return {
        products: [],
        filterData: '',
        filterProducts: [],
        pagination: {},
        tempProduct: {},
        cart: {},
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
        isNew: false,
        isLoading: false,
        fullPage: true,
        status: {
          loadingItem: '',
        },
        optionNum: '',
        coupon_code: '',
      };
    },
    methods: {
      getProducts() {
        const api = `${process.env.VUE_APP_APIPATH}/api/tingwankuo/products/all`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(res => {
          vm.products = res.data.products;
          vm.filterProducts = res.data.products;
          vm.isLoading = false;
        });
      },
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
      filterPro(name) {
        const vm = this;
        let newArray = [];
        if (name == '') {
          vm.filterProducts = vm.products;
        } else {
          newArray = vm.products.filter(function (product) {
            return product.category == name;
          });
          vm.filterProducts = newArray;
        }
      },
      filterTitle() {
        const vm = this;
        vm.filterProducts = vm.products.filter(function (product) {

          return product.title.indexOf(vm.filterData) > -1;
        });
        vm.filterData = '';
      },
      goDetail(id) {
        this.$router.push(`/detail/${id}`);
      }
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },
    created() {
      this.getProducts();
    },
  }
</script>

<style lang="scss" scoped>
  .bg-set {
    color: white;
    background: linear-gradient(to right,rgb(27, 99, 141),rgb(0, 71, 112),rgb(0, 71, 112),rgb(27, 99, 141));
  }

  .pro-title {

    display: inline-block;
    font-size: 30px;
  }

  .side-list {
    background: #4380c0;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    /* width: 100px; */
    transition: all 0.4s;
    margin: 20px 0;
    border-radius: 20px;
  }

  .side-list:hover {
    cursor: pointer;
    background: #2ba595;
  }

  .point {
    cursor: pointer;
  }

  .my-img {
    background-size: cover;
    background-position: center center;
    height: 200px;
    transition: all 0.8s;
  }

  .my-img:hover {
    height: 200px;
    transform: scale(1.2)
  }
  .imgContainer{
    height: 200px;
    overflow: hidden;
  }
  .showCate {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgb(23, 152, 238);
    color: white;
    z-index: 1000;
    padding: 5px 10px;
    border-radius: 5px;
  }

</style>