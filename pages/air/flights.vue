<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        </div>
        <!-- 分页 -->
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change: 页数切换时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size: 当前页面的条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem";
export default {
  data() {
    return {
      // 航班总数据
      flightsData: {
        flights: []
      },
      // 航班列表数据 用于循环flightsItem组件
      // dataList: [], 
      pageSize: 5,
      pageIndex: 1,
      total: 0
    };
  },
  computed: {
    dataList(){
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  },
  components: {
    flightsListHead,
    flightsItem
  },
  methods: {
    handleSizeChange(value){
      this.pageSize = value
      // 重新回到第一页
      this.pageIndex = 1
    },
    handleCurrentChange(value){
      this.pageIndex = value
    },
    getData() {
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        // this.dataList = res.data.flights;
        this.total = res.data.total
      });
    }
  },
  mounted() {
    // console.log(this.$route.query)
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>