<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="true"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4 table-hover">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th width="170" class="text-left">產品名稱</th>
          <th>產品編號</th>
          <th width="100" class="text-center">是否啟用</th>
          <th width="130" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled == 'Y'" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    


    <!-- 下面是分頁component -->

    <!-- <pagen @changePage="getProducts" :propPage="pagination"></pagen> -->

    <!-- 下面是新增修改的modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew == true">新增產品</span>
              <span v-if="isNew == false">編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempProduct.img_url" placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input v-if="status.resetFile" type="file" id="customFile" class="form-control" @change="uploadFile" ref="files">
                </div>
                <img class="img-fluid" :src="tempProduct.img_url" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="form-group">
                  <label for="description">產品編號</label>
                  <input type="text" class="form-control" id="description" v-model="tempProduct.code" placeholder="請輸入產品編號">
                </div>


                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <select class="custom-select" name="category" id="category" v-model="tempProduct.category">
                      <option value="">請選擇</option>
                      <option value="運動">運動</option>
                      <option value="登山">登山</option>
                      <option value="休閒">休閒</option>
                      <option value="防水">防水</option>
                    </select>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" v-model="tempProduct.description" placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="'Y'"
                      :false-value="'N'" id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatePorduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 下面是刪除的modal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import $ from 'jquery';
  import {db, storage} from '@/firebase.js'
  import pagen from '../../components/pagination';
  export default {
    components:{
      pagen,
    },
    data() {
      return {
        products: [],
        pagination: {},
        tempProduct: {
          title: '',
          code: '',
          category : '',
          is_enabled: 'Y',
          description: '',
          img_url: '',
        },
        isNew: false,
        isLoading: false,
        fullPage: true,
        status: {
          fileUploading: false,
          resetFile: false,
        },
      }
    },
    methods: {
      getProducts() {  // get products list
        const vm = this
        vm.isLoading = true
        db.ref('huge-products').on('value', function (snapshot) {
          vm.isLoading = false
          vm.products = vm.listFormat(snapshot.val())
        })
      },
      openModal(isNew, item) {
        if (isNew) {
          this.tempProduct = {
            title: '',
            code: '',
            category : '',
            is_enabled: 'Y',
            description: '',
            img_url: '',
          }
          this.isNew = true;
        } else {
          this.tempProduct = {...item}
          this.isNew = false;
        }
        this.status.resetFile = true
        $('#productModal').modal('show');
      },
      updatePorduct() {
        const vm = this
        if (this.isNew) {  // 新增產品
          db.ref('huge-products').push({
            title: vm.tempProduct.title,
            code: vm.tempProduct.code,
            category : vm.tempProduct.category,
            is_enabled: vm.tempProduct.is_enabled,
            description: vm.tempProduct.description,
            img_url: vm.tempProduct.img_url,
          }).then(result => {
            vm.$notify({
              title: '成功',
              message: `新增 ${vm.tempProduct.title} 成功`,
              type: 'success'
            });
            $('#productModal').modal('hide');
            vm.status.resetFile = false
          })
        } else {  // 更新產品
          db.ref(`huge-products/${vm.tempProduct.index}`).set({
            title: vm.tempProduct.title,
            code: vm.tempProduct.code,
            category : vm.tempProduct.category,
            is_enabled: vm.tempProduct.is_enabled,
            description: vm.tempProduct.description,
            img_url: vm.tempProduct.img_url,
          }).then(result => {
            vm.$notify({
              title: '成功',
              message: `更新 ${vm.tempProduct.title} 成功`,
              type: 'success'
            });
            $('#productModal').modal('hide');
            vm.status.resetFile = false
          })
        }
      },
      deleteModal(item) {
        this.tempProduct = Object.assign({}, item);
        $('#delProductModal').modal('show');
      },
      confirmDelete() {  // 刪除商品
        const vm = this
        db.ref(`huge-products/${vm.tempProduct.index}`).remove()
          .then(function() {
            vm.$notify({
              title: '成功',
              message: `刪除 ${vm.tempProduct.title} 成功`,
              type: 'success'
            })
            console.log("Remove succeeded.")
            $('#delProductModal').modal('hide')
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          })
      },
      next (snapshot) {  //  計算上傳進度
        let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");
      },
      completeUpload () {  // 上傳完成
        console.log('loading was completed !')
        const vm = this
        storage.ref('photo/' + vm.currentFileName).getDownloadURL().then(url => {
          vm.tempProduct.img_url = url
        })
      },
      uploadFile () {  // 上傳照片並回傳網址
        const vm = this
        const uploadedFile = this.$refs.files.files[0]
        this.currentFileName = uploadedFile.name
        storage.ref('photo/' + uploadedFile.name).put(uploadedFile)
          .on('state_changed',vm.next ,null, vm.completeUpload)
      },
    },
    created() {  //  初始化
      this.getProducts()
    }
  };

</script>
