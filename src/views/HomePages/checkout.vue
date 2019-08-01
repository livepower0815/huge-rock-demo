<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 text-center ">
          <span class="h4 carts_title" @click="toCartd">1.Carts detail</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 pay_title">2.Check out</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">3.Order completed！</span>
        </div>
      </div>


      <div class="row mt-5">

        <!-- 購物車列表 -->
        <div class="col-md-6">
          <table class="table my_list">
            <thead class="bg-secondary text-white">
              <th>Title</th>
              <th>Type</th>
              <th class="text-right">Qty</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carts" :key="index">
                <td class="align-middle">
                  {{item.product_name}}
                </td>
                <td class="align-middle"> {{item.product_type}} </td>
                <td class="align-middle text-right"> {{item.product_qty}} </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">Total</td>
                <td class="text-right"> {{carts.length}} Items </td>
              </tr>
            </tfoot>
          </table>

        </div>

        <!-- 建立訂單 -->
        <form class="col-md-6 my_box">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
              v-validate="'required|email'" v-model="form.user.email" placeholder="請輸入 Email">
            <!-- <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span> -->
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"
              v-validate="'required'" v-model="form.user.name" placeholder="輸入姓名">
            <!-- <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span> -->
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="tel"
              v-validate="'required'" v-model="form.user.tel" placeholder="請輸入電話">
            <!-- <span class="text-danger" v-if="errors.has('tel')">請輸入聯絡電話</span> -->
          </div>

          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-info"  @click.prevent="createOrder">送出訂單</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import {db} from '@/firebase.js'


  export default {
    data() {
      return {
        carts: [],
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
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
          this.$router.push(`/pay/${result.key}`)
        })
      },
      toCartd () {
        this.$router.push('/cartList');
      },
    },
    created() {
      this.getCart();
    },
  }
</script>

<style lang="scss" scoped>
  #bg-gray {
    background: rgb(243, 243, 243);
  }

  .my_box {
    background: #36679b;
    padding: 20px 20px;
    border-radius: 3px;
    color: white;
  }

  .my_list {
    background: rgb(230, 230, 230);
  }

  .carts_title {
    color: white;
    background: #1aac98;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .carts_title:hover {
    cursor: pointer;
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