<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 监听BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });
    // 监听滚动事件
    if (this.probeType) {
      this.scroll.on("scroll", (position) => {
        // console.log(position)
        this.$emit("scroll", position);
      });
    }
    // 监听上拉事件 额外插件，需要下载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    // 刷新页面（重新计算高度） 数据（图片等）全部加载完后重新加载可滚动区域(scrollerHeight)
    this.scroll.refresh();
  },
  methods: {
    // time=300属于默认属性
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 在第一次上拉刷新完毕后重新调用上拉刷新
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
  },
};
</script>
<style scoped>
</style>