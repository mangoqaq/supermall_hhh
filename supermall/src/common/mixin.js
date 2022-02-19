import {
  debounce
} from "common/utils";
export const itemListenerMixin = {
  data() {
    return {
      ItemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    // 防抖
    this.refresh = debounce(this.$refs.scroll.refresh, 30);
    // 对监听的事件进行保存
    this.ItemImageListener = () => {
      this.refresh();
    };
    // 监听item中图片加载完成 $bus事件总线 接收goods list item传递来的数据
    this.$bus.$on("itemImageLoad", this.ItemImageListener);
  },
}
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },

  methods: {
    // 一键返回顶部定时定位
    backTop() {
      // scrollTo(x,y,time)
      this.$refs.scroll.scrollTo(0, 0, 2000);
    },
  },
}
