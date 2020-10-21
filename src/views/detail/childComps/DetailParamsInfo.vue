<template>
  <div class="params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <table v-for="(table,index) in paramsInfo.rule.tables" :key="index" class="size-info">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="style-info">
      <tr v-for="(tr,index) in paramsInfo.info.set" :key="index">
        <td class="style-key">{{tr.key}}</td>
        <td class="style-value">{{tr.value}}</td>
      </tr>
    </table>
    <div class="params-img" v-if="paramsInfo.info.images">
      <img v-lazy="paramsInfo.info.images[0]" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props:{
      paramsInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
 .params-info{
   padding:15px 10px;
   border-bottom: 4px solid #f2f2f4;
   font-size: 14px;
 }
  .params-info table{
    border-collapse: collapse;
    width: 100%;
  }
 .params-info table tr {
   height: 42px;
 }
 .params-info table tr td {
   border-bottom: 1px solid rgba(100,100,100,.1);
 }
  .style-info{
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .style-key{
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
  .style-value{
    color: #eb4868;
  }
 .info-img img {
   width: 100%;
 }
</style>
