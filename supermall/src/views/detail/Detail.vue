<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailimageload="detailimageload"
      />
      <detail-params-info ref="params" :paramInfo="itemParams" />
      <detail-comment-info ref="comments" :commentInfo="commentInfo" />
      <goods-list ref="recommends" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top
      class="backtop"
      v-show="isShowBackTop"
      @click.native="backTop"
    ></back-top>

    <toast :message="message" :show="show"/>

  </div>
</template>

<script>
import DetailNavBar from "./chirldComps/DetailNavBar";
import DetailSwiper from "./chirldComps/DetailSwiper";
import DetailBaseInfo from "./chirldComps/DetailBaseInfo";
import DetailShopInfo from "./chirldComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";

import DetailGoodsInfo from "./chirldComps/DetailGoodsInfo";
import DetailParamsInfo from "./chirldComps/DetailParamsInfo";
import DetailCommentInfo from "./chirldComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./chirldComps/DetailBottomBar";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { debounce } from "common/utils";

import Toast from 'components/common/toast/Tost'

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

    Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      ItemImageListener: null,
      themeYopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message:"",
      show:false
    };
  },
  created() {
    // 1、获取id
    this.iid = this.$route.params.iid;
    // 2、请求详情页数据
    getDetail(this.iid).then((res) => {
      // 获取轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品的对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺的信息
      this.shop = new Shop(data.shopInfo);
      // 获取详情的信息
      this.detailInfo = data.detailInfo;
      //   取出参数信息
      this.itemParams = data.itemParams;
      //   取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 等待在数据全部渲染后执行回调
      // this.$nextTick(()=>{
      //   // 最新DOM已经被渲染完了，但是图片仍然没有加载完
      // this.themeYopYs = [];
      // this.themeYopYs.push(0);
      // this.themeYopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeYopYs.push(this.$refs.comments.$el.offsetTop);
      // this.themeYopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeYopYs);
      // })
    });
    // 3、请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
    // 4、 给getThemeTopY赋值  防抖
    this.getThemeTopY = debounce(() => {
      this.themeYopYs = [];
      this.themeYopYs.push(0);
      this.themeYopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeYopYs.push(this.$refs.comments.$el.offsetTop - 44);
      this.themeYopYs.push(this.$refs.recommends.$el.offsetTop - 44);
      // 添加一个最大值（针对复杂判断的第二种方法设计）
      this.themeYopYs.push(Number.MAX_VALUE);
      // console.log(this.themeYopYs, "-----");
    }, 300);
  },
  methods: {
    // 监听详情图片加载完成
    detailimageload() {
      // 混入中封装的refresh()
      this.refresh();
      // this.$refs.scroll.refresh()
      this.getThemeTopY();
    },
    // 标题点击
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeYopYs[index], 200);
    },
    // 滚动切换标签
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeYopYs.length;
      // 第一种长判断方法：
      // for (let i = 0; i < length; i++) {
      // if (this.currentIndex !== i &&
      // ((i < length - 1 && positionY >= this.themeYopYs[i] && positionY < this.themeYopYs[i + 1])
      // || (i === length - 1 && positionY >= this.themeYopYs[i]))) {
      // 第二种针对复杂判断的优化方法：
      // 为themeYopYs另外添加一个最大值
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeYopYs[i] &&
          positionY < this.themeYopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.cerrentIndex = this.currentIndex;
        }
      }
      // 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    // 点击购物车按钮
    addToCart() {
      // 获取购物车需要展示的消息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车里
      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false,
        //   this.message = ''
        // }, 1500);
        console.log(this.$toast)
        this.$toast.show(res,1500)
      });
      // console.log("--接受点击事件--", product);
    },
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.ItemImageListener);
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>