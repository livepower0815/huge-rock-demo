<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">1.Carts detail</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">2.Check out</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 ok_title">3.Order completed！</span>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <th>Title</th>
              <th>Type</th>
              <th class="text-right">Qty</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order.products" :key="index">
                <td class="align-middle">{{ item.product_name }}</td>
                <td class="align-middle">{{ item.product_type }}</td>
                <td class="align-middle text-right">{{ item.product_qty}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">SUM</td>
                <td class="text-right">{{ order.products.length }} Items</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.email }}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{{ order.name }}</td>
              </tr>
              <tr>
                <th>Tel</th>
                <td>{{ order.tel }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <button class="btn btn-primary" @click="goHome">Back to the home page</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {db} from '@/firebase.js'

  export default {
    data() {
      return {
        isLoading: false,
        fullPage: true,
        orderId: '',
        order: {
          products: [],
        },
      }
    },
    methods: {
      getOrder() {
        const vm = this;
        vm.isLoading = true;
        db.ref(`huge-orderList/${vm.orderId}`).once('value', function (snapshot) {
          vm.order = snapshot.val()
          vm.isLoading = false
        })
      },
      goHome() {
        this.$router.push('/');
      }
    },
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();

    },
  }
</script>

<style lang="scss" scoped>
  #bg-gray {
    background: rgb(243, 243, 243);
  }

  .my_title {
    color: white;
    background: #36679b;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .ok_title {
    color: white;
    background: #1fa34b;
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