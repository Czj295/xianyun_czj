<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 子组件可以用this.$emit方法调用父组件里面传过去的方法 -->
        <flightsFilters :data='cacheFligthsData' @setDataList="setDataList"/>

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
        <flightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from '@/components/air/flightsFilters'
import flightsAside from '@/components/air/flightsAside'
export default {
  data() {
    return {
      // 航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 用来缓存数据 确保flightsData 不会被筛选组件改变
      cacheFligthsData: {
        flights: [],
        info:{},
        options: {}
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
        this.pageIndex * this.pageSize)
    }
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
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
        // console.log(res.data);
        this.flightsData = res.data;
        // 结构一个用来缓存数据的对象
        this.cacheFligthsData = {...res.data}
        console.log(this.cacheFligthsData)
        // this.dataList = res.data.flights;
        this.total = res.data.total
      });
    },
    // 设置dataList数据  用来给筛选组件使用
    setDataList(arr){
      this.flightsData.flights = arr
      this.total = arr.length
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