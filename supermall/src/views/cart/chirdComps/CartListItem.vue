<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkedClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">×{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkbutton/CheckButton.vue";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkedClick(){
      this.product.checked = !this.product.checked
    }
  },
};
</script>
<style scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.item-selector {
    /* 居中显示 */
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  height: 100px;
  width: 80px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  padding: 5px;
  color: #333;
  position: relative;
  overflow: hidden;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>