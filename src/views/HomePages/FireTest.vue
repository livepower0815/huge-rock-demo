<template>
  <div>
    <h1 class="text-white">1234</h1>
    <input type="file" id="testFile" @change="uploadFile" ref="files">
    <img v-if="fireImgUrl" :src="fireImgUrl" alt="img">
  </div>
</template>

<script>
import {db, storage} from '@/firebase.js'
import 'firebase/storage'

  export default {
    data() {
      return {
        fireImgUrl: ''
      }
    },
    methods: {
      next (snapshot) {
        let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");
      },
      uploadFile () {
        const uploadedFile = this.$refs.files.files[0];
        console.log(uploadedFile)
        storage.ref('photo/' + uploadedFile.name).put(uploadedFile)
          .on('state_changed',this.next ,null,() => {
            console.log('上傳完成!!!!')
            storage.ref('photo/' + uploadedFile.name).getDownloadURL().then(url => {
              this.fireImgUrl = url
            })
          })
      }
    },
    components:{
      
    },
    watch: {
      
    },
    mounted(){
      // db.ref('todos').once('value').then(result => {
      //   console.log(result.val())
      // })
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
