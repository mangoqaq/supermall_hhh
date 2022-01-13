<template>
  <div class="tabcontorl">
    <div
      v-for="(item, index) in titles"
      :class="{ active: index == currentIndex }"
      :key="item"
      class="tabcontorl-item"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContorl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
      itemClick(index){
          this.currentIndex = index;
          // 子组件向父组件传递点击的index 传递给的方法以及index
          this.$emit('tabClick',index)
      }
  },
};
</script>
<style scoped>
.tabcontorl {
  display: flex;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  background-color: #fff;
  box-shadow: 2px ;
}
.tabcontorl-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>