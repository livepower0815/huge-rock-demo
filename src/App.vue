<template>
  <div id="app" :class="{'bg-color':!$route.meta.bgColor, 'bg-color-dashboard':$route.meta.bgColor}">
    
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/all";

.bg-color {
  // background: rgb(2, 59, 133);
  background-image: linear-gradient(to right, rgb(38, 67, 95),#091a31,#091a31,#091a31,#253555);
  min-height: 100vh;
}

.bg-color-dashboard {
  background: rgb(242, 245, 248);
  // background-image: linear-gradient(to right, rgb(38, 67, 95),#091a31,#091a31,#091a31,#253555);
  min-height: 100vh;
}

</style>
