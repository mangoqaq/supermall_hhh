<<template>
    <div class="bottom-bar">
        <check-button class="select-all" @click.native="checkBtnClick" :is-checked="isSelectAll"/>
        <span>全选</span>
        <span class="total-price">合计：￥{{totalPrice}}</span>
        <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
    </div>
</template>
<script>
import CheckButton from "components/content/checkbutton/CheckButton.vue";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkBtnClick() {
        if(this.isSelectAll){
            // 全选状态
            this.$store.state.cartList.forEach(item=>item.checked = false)
        }else{
            // 有部分或全部补选中
            this.$store.state.cartList.forEach(item=>item.checked = true)
        }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          //   是否为true
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 长度为0 取反为true 但是需要遍历所有
      // return !(this.$store.state.cartList.filter(item=>!item.checked).length)
      // 性能略高，find找到对应内容就停止 不需要遍历所有   
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
};
</script>
<style scope>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.total-price {
  margin-left: 10px;
  font-size: 16px;
  color: #666;
}
.buy-product {
  float: right;
  background-color: orangered;
  color: white;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
</style>