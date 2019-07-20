<template>
  <div>

    <GmapMap :center="center" :zoom="14" style="width: 100%; height: 600px">
      <GmapInfoWindow 
      :options="infoOptions" 
      :position="infoWindowPos" 
      :opened="infoWinOpen" 
      @closeclick="infoWinOpen=false">
        <p>{{infoContent}}</p>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
      </GmapInfoWindow>
      <GmapMarker v-for="(m, index) in originMarkers" 
      :key="index"
      :position="m.position"
      :icon="m.icon"
      :animation="4"
      :clickable="true"
      :draggable="false"
      @click="toggleInfoWindow(m,index)"></GmapMarker>
    </GmapMap>

    <div class="text-center pt-5">
      <div class="form-row">
        <div class="col-md-4"></div>
        <div class="col-md-4 mb-3 ">
          <h4 class="pt-5" @click="toggleMarkers">click to toggle google map markers</h4>
          <h4 class="pt-5" @click="testClick">點擊測試</h4>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
    <!-- <test-modal></test-modal> -->
  </div>
</template>

<script>
  import TestModal from '@/components/TestModal'

  export default {
    data() {
      return {
        center: {
          lat: 24.996384,
          lng: 121.291775,
        },
        infoContent: '',
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -45
          }
        },
        originMarkers: [

        ],
        markers: [
          {
            position: {
              lat: 24.994593,
              lng: 121.292779,
            },
            infoText:'這裡是早餐店',
            icon:{
              // url:'http://maps.google.com/mapfiles/kml/shapes/man.png',
              scaledSize:{
                width:30,
                height:30,
              }
            },
          },
          {
            position: {
              lat: 24.996384,
              lng: 121.291775,
            },
            infoText:'這是我家',
            icon:{
              url:'https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-512.png',
              scaledSize:{
                width:50,
                height:50,
              }
            },
          },
          // {
          //   position: {
          //     lat: 24.998384,
          //     lng: 121.294775,
          //   },
          //   infoText:'這是公司',
          //   icon:{
          //     path: 'M17.237,3.056H2.93c-0.694,0-1.263,0.568-1.263,1.263v8.837c0,0.694,0.568,1.263,1.263,1.263h4.629v0.879c-0.015,0.086-0.183,0.306-0.273,0.423c-0.223,0.293-0.455,0.592-0.293,0.92c0.07,0.139,0.226,0.303,0.577,0.303h4.819c0.208,0,0.696,0,0.862-0.379c0.162-0.37-0.124-0.682-0.374-0.955c-0.089-0.097-0.231-0.252-0.268-0.328v-0.862h4.629c0.694,0,1.263-0.568,1.263-1.263V4.319C18.5,3.625,17.932,3.056,17.237,3.056 M8.053,16.102C8.232,15.862,8.4,15.597,8.4,15.309v-0.89h3.366v0.89c0,0.303,0.211,0.562,0.419,0.793H8.053z M17.658,13.156c0,0.228-0.193,0.421-0.421,0.421H2.93c-0.228,0-0.421-0.193-0.421-0.421v-1.263h15.149V13.156z M17.658,11.052H2.509V4.319c0-0.228,0.193-0.421,0.421-0.421h14.308c0.228,0,0.421,0.193,0.421,0.421V11.052z',
          //     fillColor: 'rgb(141, 197, 230)',
          //     fillOpacity: 1,
          //     strokeColor: 'rgb(52, 68, 214)',
          //     strokeWeight: 0,
          //     scale: 2,
          //   },
          // },
          {
            position: {
              lat: 24.998384,
              lng: 121.294775,
            },
            infoText:'這是公司',
            icon:{
              // url:'http://maps.google.com/mapfiles/kml/shapes/man.png',
              scaledSize:{
                width:30,
                height:30,
              }
            },
          },
        ],
      };
    },
    methods:{
      testClick(){
        let isSafari = false
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1) { 
          isSafari = true
        }
        console.log(isSafari)
      },
      toggleMarkers(){
        if(this.originMarkers.length < 1){
          this.originMarkers = [...this.markers]
        }else{
          this.originMarkers = []
        }
      },
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = marker.infoText;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
    },
    components:{TestModal},
    watch: {
      
    },
    mounted(){
      
      // publicIP.v4().then(result => {
      //   console.log(result);
        
      // })
      
      
    }
  };
</script>

<style lang="scss" scoped>

.dddd {
  color: rgb(52, 68, 214)
}

</style>
