<template>
  <div id="pro-container">
    <div class="">
      <ul class="grid-box">
        <li
          class="grid-content bg-purple"
          @click="goOApage(i.pid)"
          v-for="i in productList"
          :key="i.pid"
        >
          {{ i.productName }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { loginByUsername } from "@/api/login.js";
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "product",
  data() {
    return {
      productList: [],
    };
  },
  computed: {
    ...mapGetters(["products", "userInfo"]),
  },
  created() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.productList = this.products;
    },
    goOApage(id) {
       sessionStorage.setItem('PRODUCTID',id)
      this.$router.push({
        path: "/OA",
        query: {
          id: id,
          schoolId: this.userInfo.schoolId,
        },
      });
    },
  },
};
</script>
<style lang="scss" >
.grid-box {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.grid-content {
  width: 23%;
  margin: 24px;
  min-height: 180px;
  background-color: #d3dce6;
}
</style>