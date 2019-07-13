<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" arrow="hover">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
          background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
          background-size:contain contain;
          `"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="search">
      <div class="trapezoidal">
        <el-row type="flex">
          <div v-for="(item,index) in tabs" :key="index" class="tabdiv" @click="handleClick(index)" :class="{ active: currentTab === index }">
            <span>{{ item.name }}</span>
          </div>
        </el-row>
      </div>

      <el-row type="flex" align="middle" class="search-input">
        <input
          :placeholder="tabs[currentTab].placeholder"
          v-model="searchValue"
          @keyup.enter.native="Search"
        />
        <i class="el-icon-search" @click="Search"></i>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      tabs: [
        { name: "攻略", placeholder: "  请输入城市", url: "" },
        { name: "酒店", placeholder: "  请输入城市搜索酒店", url: "" },
        { name: "国内机票", placeholder: "  请输入出发地", url: "/air" }
      ],
      currentTab: 0,
      current: 0,
      searchValue: ""
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  },
  methods: {
    handleClick(index){
      console.log(index)
      this.currentTab = index;
      if(this.currentTab === 2){
        this.$router.push('/air')
      }
      console.log(this.currentTab)
    },
    Search(){}
  }
}
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  .search {
    z-index: 10;
    width: 400px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -50px;
    .trapezoidal {
      width: 300px;
      height: 0;
      .tabdiv {
        width: 65px;
        height: 0;
        opacity: 0.8;
        border-bottom: 30px solid cornflowerblue;
        border-right: 15px solid transparent;
        position: relative;
        cursor: pointer;

        &:hover {
          border-bottom: 30px solid #409eff;
          border-right: 15px solid transparent;
        }
      }
    }
  }
  span {
    display: block;
    color: #fff;
    position: absolute;
    top: 6px;
    left: 10px;
    font-size: 13px;
  }
  .search-input {
    width: 550px;
    height: 30px;
    position: absolute;
    top: 30px;
    input {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 5px;
    }
    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
      display: block;
      width: 34px;
      height: 28px;
      text-align: center;
      padding-top: 6px;
      background: #409eff;
    }
  }
}
</style>
