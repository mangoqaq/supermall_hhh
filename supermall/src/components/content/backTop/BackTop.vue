<template>
    <!-- 点击事件方法一：从组件内部设置点击事件传出事件，在组件外部使用时使用@backClick=“外部方法名backClick”，在设置事件 -->
    <!-- <div class="back-top" @click="backClick">
        <img src="~assets/img/common/top.png" alt="">
    </div> -->
    <!-- 第二种方法：直接在使用组件时监听组件的点击事件，使用.native -->
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name:'BackTop',
    // methods: {
    //     backClick(){
    //         this.$emit('backTop')
    //         console.log('我是backtop内部的传递方法')
    //     }
    // },
}
</script>

<style scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 60px;
}
.back-top img{
    width: 43px;
    height: 43px;
}
</style>