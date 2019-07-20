<template>
  <div>
    <div class="text-center py-5">
      <div class="form-row">
        <div class="col-md-4"></div>
        <div class="col-md-4 mb-3 ">
          <input type="text" class="form-control" ><br>
          {{ test }}
        </div>
        <div class="col-md-4" @click="testClick">點擊我</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TestModal',
    props:['test'],
    data() {
      return {
        
      };
    },
    watch: {

    },
    methods: {
      testClick(){
        let str = this.test
        this.$emit('dataAdd',str+'C')
      }
    },
  };
</script>