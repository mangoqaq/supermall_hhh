<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature></feature>
      <tab-contorl
        class="tab-contorl"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-contorl>
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
import TabContorl from "components/content/TabControl/TabContorl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childrenComps/HomeSwiper";
import HomeRecommendView from "./childrenComps/HomeRecommendView";
import Feature from "./childrenComps/Feature";

import { getHomeMultidata, getHomeGoods } from "network/home";
import Scroll from 'components/common/scroll/Scroll'
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
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.cureentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关
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
    },
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(sort) {
      const page = this.goods[sort].page + 1;
      getHomeGoods(sort, page).then((res) => {
        this.goods[sort].list.push(...res.data.result.wall.list);
        this.goods[sort].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home_nav {
  background-color: var(--color-tint);
  color: white;
  /* 吸顶效果 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-contorl {
  /* 吸顶效果（暂时） 很多浏览器不支持 移动端支持*/
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

