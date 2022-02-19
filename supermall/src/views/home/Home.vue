<template>
  <div id="home">
    <nav-bar class="home_nav"><div slot="center">购物街</div></nav-bar>
    <!-- 虚假切换页面按键 -->
    <tab-contorl
      class="tab-top-control"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-contorl>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contenScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <tab-contorl
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top class="backtop" v-show="isShowBackTop" @click.native="backTop"></back-top>
  </div>
</template>

<script>
import TabContorl from "components/content/TabControl/TabContorl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childrenComps/HomeSwiper";
import HomeRecommendView from "./childrenComps/HomeRecommendView";
import Feature from "./childrenComps/Feature";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin,backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    TabContorl,
    GoodsList,

    HomeSwiper,
    HomeRecommendView,
    Feature,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      cureentType: "pop",
      isShowBackTop: false,
      TaboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin,backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.cureentType].list;
    },
  },
  // 离开页面
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.scroll.y;
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.ItemImageListener);
  },
  // 进入
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关
    // 点击切换currentType
    tabClick(index) {
      switch (index) {
        case 0:
          this.cureentType = "pop";
          break;
        case 1:
          this.cureentType = "new";
          break;
        case 2:
          this.cureentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 一键返回顶部按钮分情况出现
    contenScroll(position) {
      // 1、判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2、决定tabcontrol2是否吸顶（position:fixed  ===>相对于浏览器窗口定位）
      this.isTabFixed = -position.y > this.TaboffsetTop;
    },
    // 下拉加载更多数据获取
    loadMore() {
      this.getHomeGoods(this.cureentType);
    },
    swiperImageLoad() {
      // 监听首页中切换栏的距顶高度
      this.TaboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求相关

    // 请求轮播图
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home_nav {
  background-color: var(--color-tint);
  color: white;
  /* 使用浏览器原生滚动时，为了让导航不跟随一起滚动所以设置了吸顶效果 */
  /* 但是后期使用了better-scroll，设置了区域滚动，所以不需要在设置吸顶效果 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 9;
}
/* 由于换为了better-scroll，所以不起效果，需要重新写别的代码 */
/* .tab-contorl { */
/* 吸顶效果（暂时） 很多浏览器不支持 移动端支持*/
/* position: sticky; */
/* top: 44px; */
/* z-index: 9; */
/* } */
/* 根据滑动距离判断是否添加fixed属性 */
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* content滚动样式设置1 */
/* .content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */
/* content滚动样式设置2 */
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  /* margin-top: 44px; */
}
.tab-top-control {
  position: relative;
  z-index: 9;
}
</style>

