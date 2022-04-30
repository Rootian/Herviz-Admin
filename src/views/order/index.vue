<template>
  <d2-container>
    <el-card style="height: 1000px" class="d2-card">
      <template slot="header">
        <div style="text-align: center; color: #606266">
          Order Management
        </div>
      </template>
      <el-row >
        <el-col :span="8" :offset="1">
          <el-input placeholder="" v-model="filters.keywords" style="width: 400px">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" style="color: #409EFF"></el-button>
          </el-input>
        </el-col>

      </el-row>
      <div></div>

      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="dataList" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column prop="id" label="Order Id" align="center" header-align="center" width="100"></el-table-column>
            <el-table-column prop="uId" label="User Id" align="center" header-align="center"></el-table-column>
            <el-table-column prop="classId" label="Class Id" align="center" header-align="center"></el-table-column>
            <el-table-column prop="vin" label="Vehicle Assigned" width="150" align="center" header-align="center"></el-table-column>
            <el-table-column prop="pDate" label="Pickup Date" width="120" align="center" header-align="center" ></el-table-column>
            <el-table-column prop="dDate" label="Drop Date" width="120" align="center" header-align="center" ></el-table-column>
            <el-table-column prop="pickupLoc" label="Pickup Location" width="150" align="center" header-align="center">
              <template slot-scope="scope">
                <span>{{ getOfficeLabel(scope.row.pickupLoc) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dropLoc" label="Drop Location" width="120" align="center" header-align="center">
              <template slot-scope="scope">
                <span>{{ getOfficeLabel(scope.row.dropLoc) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sOdometer" label="Start Odometer" width="140" align="center" header-align="center"></el-table-column>
            <el-table-column prop="eOdometer" label="End Odometer" width="120" align="center" header-align="center"></el-table-column>
            <el-table-column prop="odometerLimit" label="Odometer Limit" width="150" align="center" header-align="center"></el-table-column>
            <el-table-column prop="status" label="Status" width="110" align="center" header-align="center"></el-table-column>
            <el-table-column prop="couponId" label="Coupon Id" width="120" align="center" header-align="center"></el-table-column>

            <el-table-column label="Action" align="center" header-align="center" width="160">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button type="danger" plain size="mini" @click="handleCancel(scope.$index, scope.row)">Cancel</el-button>
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


    <el-dialog title="Edit Order Information" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form-item label="Order Id" prop="id">
                <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="User Id" prop="uId">
                <el-input v-model="editForm.uId" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Class Id" prop="classId">
                <el-input v-model="editForm.classId" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Vehicle Id" prop="vin">
                <el-input v-model="editForm.vin" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Pickup Date" prop="pDate">
                <el-date-picker
                  v-model="editForm.pDate"
                  type="date"
                  placeholder="Select Pickup Date"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="Drop Date" prop="dDate">
                <el-date-picker
                  v-model="editForm.dDate"
                  type="date"
                  placeholder="Select Drop Date"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="Pickup Location" prop="pickupLoc">
                <el-select
                  v-model="editForm.pickupLoc"
                  value-key="pickupLoc"
                  filterable
                  reserve-keyword
                  placeholder="SELECT PICKUP LOCATION">
                  <el-option
                    v-for="item in officeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Drop Location" prop="dropLoc">
                <el-select
                  v-model="editForm.dropLoc"
                  value-key="dropLoc"
                  filterable
                  reserve-keyword
                  placeholder="SELECT DROP LOCATION">
                  <el-option
                    v-for="item in officeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Start Odometer" prop="sOdometer">
                <el-input v-model="editForm.sOdometer" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="End Odometer" prop="eOdometer">
                <el-input v-model="editForm.eOdometer" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Odometer Limit" prop="odometerLimit">
                <el-input v-model="editForm.odometerLimit" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Coupon Id" prop="couponId">
                <el-input v-model="editForm.couponId" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Status" prop="status">
                <el-select v-model="editForm.status" value-key="status" placeholder="select status">
                  <el-option
                    v-for="item in statusList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
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


  </d2-container>
</template>

<script>
  import {getOrderList, updateOrder, cancelOrder} from "../../api/api";
  import moment from 'moment';
  import { mapActions } from 'vuex';

  var defaultForm = {
    "id":"",
    "pDate":"",
    "dDate":"",
    "sOdometer": "",
    "eOdometer":"",
    "odometerLimit":"",
    "vin":"",
    "dropLoc":"",
    "pickupLoc":"",
    "couponId":"",
    "uId":"",
    "classId":"",
    "status":""
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

        statusList:['CREATED', 'PAID', 'COMPLETED', 'CANCELED'],

        addFormVisible: false,
        addForm: Object.assign({}, defaultForm),
        addFormRules: {},
        addLoading: false,

        editFormVisible: false,
        editForm: Object.assign({}, defaultForm),
        editFormRules: {},
        editLoading: false,

        listLoading: false,

        officeList:[]
      }
    },
    methods: {
      ...mapActions('d2admin/office', [
        'loadOfficeList'
      ]),
      getOfficeList: function () {
        this.loadOfficeList().then((res) => {
          this.officeList = [];
          if (res.data.code !== 200) {
            return
          }
          let result = res.data.data;
          for (let i = 0; i < result.length; i++) {
            let record = {"id" : result[i].id, "label" : result[i].streetAddr + ',' + result[i].city};
            this.officeList.push(record);
          }
        })
      },
      getOfficeLabel: function (id) {
        let office = this.officeList.filter(function(p){
          return p.id === id;
        });
        return office[0].label
      },
      loadDataList: function () {
        let para = {
          page: this.page,
          keywords: this.filters.keywords,
          limit: this.limit
        };
        getOrderList(para).then((res) => {
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

      handleCancel: function(index, row) {
        this.$confirm('Are you sure to CANCEL this order?', 'Confirm', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          cancelOrder(row.id).then((res) => {
            this.listLoading = false;
            this.$message({
              message: 'Cancel successful',
              type: 'success'
            });
            this.loadDataList();
          });
        }).catch(() => {
        });
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
            updateOrder(para).then((res) => {
              this.editLoading = false;
              if (res.code !== 200) {
                // submit unsuccessful
                this.$message({
                  message: res.msg,
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
      },

      dateFormat:function (row, column, cellValue, index) {
        let date = row[column.property];
        if(date === null || date === '' || date === undefined){
          return ''
        } else {
          return moment(date).format("YYYY-MM-DD")
        }
      }
    },
    mounted() {
      this.loadDataList();
      this.getOfficeList();
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>

