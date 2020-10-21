<template>
  <div class="toast-container" v-show="toastShow">
    <div>{{toastMessage}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props:{
    //   message:{
    //     type:String,
    //     default:''
    //   },
    //   show:{
    //     type:Boolean,
    //     default: false
    //   }
    // }
    data(){
      return {
        toastMessage:'',
        toastShow:false
      }
    },
    methods: {
      show(message, duration) {
        this.toastMessage = message
        this.toastShow = true
        setTimeout(() => {
          this.toastMessage = ''
          this.toastShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    /*不适合给宽高，因为你不知道你的文字有多少*/
    padding: 8px 10px;
    font-size: 12px;
    z-index: 999;
    border-radius: 5px;
  }
</style>
