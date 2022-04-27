<template>
  <d2-container>
    <el-card style="height: 1000px" class="d2-card">
      <template slot="header">
        <div style="text-align: center; color: #606266">
          Vehicle Class Management
        </div>
      </template>
      <el-row >
        <el-col :span="8" :offset="1">
          <el-input placeholder="" v-model="filters.keywords" style="width: 400px">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" style="color: #409EFF"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="10">
          <el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="handleAdd">Add Class</el-button>
        </el-col>

      </el-row>
      <div></div>

      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="dataList" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column prop="id" label="Vehicle Class Id" width="140" align="center" header-align="center"></el-table-column>
            <el-table-column prop="type" label="Class Name" align="center" header-align="center"></el-table-column>
            <el-table-column prop="rentalRate" label="Rental rate/Day" width="140" align="center" header-align="center"></el-table-column>
            <el-table-column prop="fee" label="Fee/Mile" align="center" header-align="center"></el-table-column>
            <el-table-column prop="seat" label="Seat" align="center" header-align="center"></el-table-column>
            <el-table-column prop="bag" label="Bag" align="center" header-align="center"></el-table-column>
            <el-table-column label="Action" align="center" header-align="center" width="150">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button type="danger" plain size="mini" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
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


    <el-dialog title="Edit Class Information" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form-item label="Vehicle Class Id" prop="id">
                <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Class Name" prop="type">
                <el-input v-model="editForm.type" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Rental Rate/Day" prop="rentalRate">
                <el-input v-model="editForm.rentalRate" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Fee/Mile" prop="fee">
                <el-input v-model="editForm.fee" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Seat" prop="seat">
                <el-input v-model="editForm.seat" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Bag" prop="bag">
                <el-input v-model="editForm.bag" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Add New Class" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form-item label="Vehicle Class Id" prop="id">
                <el-input v-model="addForm.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Class Name" prop="type">
                <el-input v-model="addForm.type" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Rental Rate/Day" prop="rentalRate">
                <el-input v-model="addForm.rentalRate" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Fee/Mile" prop="fee">
                <el-input v-model="addForm.fee" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Seat" prop="seat">
                <el-input v-model="addForm.seat" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Bag" prop="bag">
                <el-input v-model="addForm.bag" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">Submit</el-button>
      </div>
    </el-dialog>





  </d2-container>
</template>

<script>
  import {getVehicleClassList, updateVehicleClass, deleteVehicleClass, addVehicleClass} from "../../api/api";


  var defaultForm = {
    "id":"",
    "type":"",
    "rentalRate":"",
    "fee":"",
    "seat":"",
    "bag":"",
  };
  export default {
    name: "index",
    data() {
      return {
        dataList: [

        ],
        filters:{
          keywords: null
        },
        total: 0,
        page : 1,
        limit: 10,

        addFormVisible: false,
        addForm: Object.assign({}, defaultForm),
        addFormRules: {},
        addLoading: false,

        editFormVisible: false,
        editForm: Object.assign({}, defaultForm),
        editFormRules: {},
        editLoading: false,

        listLoading: false
      }
    },
    methods: {
      loadDataList: function () {
        let para = {
          page: this.page,
          keywords: this.filters.keywords,
          limit: this.limit
        };
        getVehicleClassList(para).then((res) => {
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
      },

      handleDel: function(index, row) {
        this.$confirm('Are you sure to DELETE?', 'Confirm', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          deleteVehicleClass(row.id).then((res) => {
            this.listLoading = false;
            this.$message({
              message: 'Delete successful',
              type: 'success'
            });
            this.loadDataList();
          });
        }).catch(() => {
        });
      },

      handleAdd: function() {
        this.addFormVisible = true;
        this.addForm = Object.assign({}, defaultForm);
      },

      addSubmit: function() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            addVehicleClass(para).then((res) => {
              this.addLoading = false;
              if (res.code !== 200) {
                // submit unsuccessful
                this.$message({
                  message: res.message,
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: 'Submit successful',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.loadDataList();
            })
          }
        })
      },

      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, JSON.parse(JSON.stringify(row)))
      },

      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            updateVehicleClass(para).then((res) => {
              this.editLoading = false;
              if (res.code !== 200) {
                // submit unsuccessful
                this.$message({
                  message: res.message,
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: 'Update successful',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.loadDataList();
            })
          }
        })
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
