<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="true"></loading>
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <table id="out-table" class="table mt-4 table-striped table-hover">
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
            <tr v-for="(item, index) in orders" :key="index">
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
        <button @click="exportExecl" type="button" class="btn btn-primary">Export Excel file</button>
      </div>
    </div>
    <!-- <pagen @changePage="getOrderList" :propPage="pagination"></pagen> -->

  </div>
</template>

<script>
import pagen from '../../components/pagination'
import {db} from '@/firebase.js'
import FileSaver from 'file-saver'
import XLSX1 from 'xlsx'
// import xlsxStyle from 'xlsx-style'
// import XLSX from 'xlsx-style'
// import 'xlsx-style/dist/xlsx.full.min.js'
// import 'xlsx-style/dist/xlsx.js'
// import 'xlsx-style/dist/cpexcel.js'
// import 'xlsx-style/xlsx.js'



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
    exportExecl () {  // 將 table 匯出成 excel
      const vm = this
      /* generate workbook object from table */
      let wb = XLSX1.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      wb.Sheets.Sheet1.A1.s = {
        font: {
          sz: 30,
          bold: true,
          color: {
            rgb: "FFFFAA00"
          }
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrap_text: true
        }
      }
      wb.Sheets.Sheet1.C1.s = {
        font: {
          sz: 30,
          bold: true,
          color: {
            rgb: "FFFFAA00"
          }
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
          wrap_text: true
        }
      }
      console.log(wb)
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })
      try {
        // FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        FileSaver.saveAs(new Blob([vm.s2ab(wbout)], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
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