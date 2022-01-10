<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activedStyle"><slot name="item-text"></slot></div>
    <!-- 传class -->
    <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        // 当前活跃路径与当前路径比较 不等于-1时为true
        return this.$route.path.indexOf(this.path) !== -1
      },
      activedStyle(){
        return this.isActive? {color:this.activeColor} : {}
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    margin-top: 3px;
    width: 24px;
    height: 24px;
    /* 去掉图片下部的默认3px ？？？ */
    vertical-align: middle;
    margin-bottom: 2px;
  }

/*  .active {
    color: #42B983;
  } */
</style>
