<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="true"></loading>
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <table class="table mt-4 table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th width="120">Name</th>
              <th width="180">Email</th>
              <th>購買款項</th>
              <th width="140">Tel</th>
              <th width="120" class="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="index" @dblclick="checkout(item.id)">
              <td> {{item.name}} </td>
              <td> {{item.email}} </td>
              <td>
                <ul>
                  <li v-for="(i, ind) in item.products" :key="ind">
                    {{i.product_name}} / {{i.product_type}} / {{i.product_qty}}
                  </li>
                </ul>
              </td>
              <td> {{item.tel}} </td>
              <td class="text-center">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeOrder(item.index)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <pagen @changePage="getOrderList" :propPage="pagination"></pagen> -->

  </div>
</template>

<script>
import pagen from '../../components/pagination'
import {db} from '@/firebase.js'


export default {
  components:{
    pagen,
  },
  data(){
    return {
      isLoading: false,
      fullPage: true,
      orders:[],
      pagination:{},
    }
  },
  methods:{
    getOrderList () {
      const vm = this;
      vm.isLoading = true;
      db.ref('huge-orderList').on('value', function (snapshot) {
        vm.orders = vm.listFormat(snapshot.val())
        vm.isLoading = false
      })
    },
    removeOrder (index) {
      const vm = this
      db.ref(`huge-orderList/${index}`).remove()
        .then(function() {
          vm.$notify({
            title: '成功',
            message: `刪除成功`,
            type: 'success'
          })
          console.log("Remove succeeded.")
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        })
    },
    // checkout(id){
    //   this.$router.push(`/dashboard/orderCheckout/${id}`);
    // }
  },
  created(){
    this.getOrderList();
  },
}
</script>