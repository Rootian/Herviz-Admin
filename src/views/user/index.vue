<template>
  <d2-container>
    <el-card style="height: 1000px" class="d2-card">
      <template slot="header">
        <div style="text-align: center; color: #606266">
          User Management
        </div>
      </template>
      <el-row >
        <el-col :span="8" :offset="1">
          <el-input placeholder="USERNAME" v-model="filters.keywords" style="width: 400px">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" style="color: #409EFF"></el-button>
          </el-input>
        </el-col>

      </el-row>
      <div></div>

      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="dataList" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column prop="id" label="UserId" align="center" header-align="center"></el-table-column>
            <el-table-column prop="username" label="UserName" align="center" header-align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div style="text-align: center">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                       :page-size="10"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>





  </d2-container>
</template>

<script>
  import {getUserList} from "../../api/api";

  export default {
      name: "userBoard",
      components: {},
      data() {
        return {
          dataList: [

          ],
          filters:{
            keywords: null
          },
          total: 0,
          page : 1,
          limit: 10
        }
      },
      methods: {
        loadDataList: function () {
          let para = {
            page: this.page,
            keywords: this.filters.keywords,
            limit: this.limit
          };
          getUserList(para).then((res) => {
            this.total = res.data.total;
            this.dataList = res.data.data;
          })
        },
        handleSearch: function () {
          this.page = 1;
          this.loadDataList()
        },

        handleCurrentChange: function (val) {
          this.page = val;
          this.loadDataList()
        }
      },
      mounted() {
        this.loadDataList()
      }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
