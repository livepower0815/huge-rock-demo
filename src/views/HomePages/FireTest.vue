<template>
  <div class="bgColor">
    <div class="container py-5">
      <!-- <h1 @click="addDatabase">1234</h1> -->
      <input type="file" id="testFile" @change="uploadFile" ref="files">
      <img v-if="fireImgUrl" :src="fireImgUrl" alt="img">
      <el-table
        id="out-table"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <h2 @click="exportExecl">export Execl</h2>
    </div>
  </div>
</template>

<script>
import {db, storage} from '@/firebase.js'
import 'firebase/storage'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

  export default {
    data() {
      return {
        fireImgUrl: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods: {
      exportExecl () {  // 將 table 匯出成 excel
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      next (snapshot) {  //  計算上傳進度
        let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");
      },
      completeUpload (uploadUrl) {  // 上傳完成
        console.log('loading was completed !')
        storage.ref(uploadUrl).getDownloadURL().then(url => {
          this.fireImgUrl = url
        })
      },  
      uploadFile () {  // 上傳照片並回傳網址
        const uploadedFile = this.$refs.files.files[0];
        console.log(uploadedFile)
        storage.ref('photo/' + uploadedFile.name).put(uploadedFile)
          .on('state_changed',this.next ,null, this.completeUpload('photo/' + uploadedFile.name))
      },
      addDatabase () { // DB資料 新刪修 測試
        // db.ref('todos').once('value').then(result => {
        //   console.log(result.val())
        // })
        db.ref('huge-products').push({
          title: '產品3',
          code: 'A003',
          category : '運動',
          is_enabled: 'Y',
          description: '這是產品3號',
        }).then(result => {
          console.log('完成')
        })
      },
    },
    mounted(){
      // storage.ref().child('BMI.png').getDownloadURL().then(url => {
      //   console.log(url)
      // })
      
    }
  }
</script>

<style lang="scss" scoped>

.dddd {
  color: rgb(52, 68, 214)
}

</style>
