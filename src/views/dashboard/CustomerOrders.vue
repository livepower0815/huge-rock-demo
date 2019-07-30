<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="true"></loading>
    <!-- 商品列表 -->
    <div class="row my-4">
      <div class="col-md-4 mb-4" v-for="(item, index) in products" :key="index">
        <div class="card border-0 shadow-sm">
          <div style="height: 250px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.img_url})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.description }}</p>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-info btn-sm ml-auto" @click="getProduct(item)">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <pagen @changePage="getProducts" :propPage="pagination"></pagen> -->

    <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{tempProduct.title}} ({{ tempProduct.code }})</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" :src='tempProduct.img_url' alt="">
            <div class="h5 my-4">
              {{tempProduct.description}}
            </div>
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
          </div>
          <div class="modal-footer">
            <!-- <span class="pr-3 text-secondary">合計 {{ optionNum * tempProduct.price }} 元</span> -->
            <button type="button" class="btn btn-info" @click="addtoCart(tempProduct, optionType, optionNum)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車列表 -->
    <div class="row d-flex justify-content-center my-5">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <th></th>
            <th>Title</th>
            <th>Type</th>
            <th>Qty</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in carts" :key="`carts-${index}`">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.product_name, index)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{item.product_name}}
              </td>
              <td class="align-middle"> {{item.product_type}}</td>
              <td class="align-middle"> {{item.product_qty}} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 建立訂單 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail" 
          v-model="form.user.email" placeholder="請輸入 Email">
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username" 
          v-model="form.user.name" placeholder="輸入姓名">
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" name="tel"
          v-model="form.user.tel" placeholder="請輸入電話">
        </div>


        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button @click.prevent="createOrder" class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>


  </div>
</template>



<script>
  import $ from 'jquery';
  import pagen from '../../components/pagination';
  import {db} from '@/firebase.js'


  export default {
    components: {
      pagen,
    },
    data() {
      return {
        products: [],
        pagination: {},
        tempProduct: {},
        carts: [],
        form:{
          user: {
            name: '',
            email: '',
            tel: '',
          },
          message: '',
        },
        isNew: false,
        isLoading: false,
        fullPage: true,
        status: {
          loadingItem: '',
        },
        optionNum: 1,
        optionType: 'A4-SWATCH',
        coupon_code: '',
      };
    },
    methods: {
      getProducts() {  // 取得商品列表
        const vm = this
        this.isLoading = true
        db.ref('huge-products').once('value', function (snapshot) {
          vm.products = vm.listFormat(snapshot.val())
          vm.isLoading = false
        })
      },
      getProduct(item) {  // 顯示 商品詳細資訊
        const vm = this
        vm.tempProduct = item
        vm.optionType = 'A4-SWATCH'
        vm.optionNum = 1
        $('#productModal').modal('show');
      },
      addtoCart(item, type, qty = 1) {  //  添加至購物車
        const vm = this
        vm.carts.push({
          product_name: item.title,
          product_img_url: item.img_url,
          product_type: type,
          product_qty: qty,
        })
        localStorage.cartList = JSON.stringify(vm.carts)
        $('#productModal').modal('hide')
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
      getCart() {  // 取得購物車
        const vm = this
        vm.carts = localStorage.cartList ? JSON.parse(localStorage.cartList) : []
      },
      createOrder(){  // 送出訂單
        const vm = this
        vm.isLoading = true
        db.ref('huge-orderList').push({
          name: vm.form.user.name,
          email: vm.form.user.email,
          tel : vm.form.user.tel,
          message: vm.form.message,
          products: vm.carts,
        }).then(result => {
          vm.isLoading = false
          vm.$notify({
            title: '成功',
            message: `訂單新增成功`,
            type: 'success'
          })
          vm.carts = []
          localStorage.cartList = JSON.stringify([])
          vm.form = {
            user: {
              name: '',
              email: '',
              tel: '',
            },
            message: '',
          }
        })
        
      },
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },
    created() {
      this.getProducts();  // 取得商品列表
      this.getCart()  // 取得購物車
    },
  }

</script>
