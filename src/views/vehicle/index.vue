<template>
  <d2-container>
    <el-card style="height: 1000px" class="d2-card">
      <template slot="header">
        <div style="text-align: center; color: #606266">
          Vehicle Management
        </div>
      </template>
      <el-row >
        <el-col :span="8" :offset="1">
          <el-input placeholder="" v-model="filters.keywords" style="width: 400px">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" style="color: #409EFF"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="10">
          <el-button type="primary" plain icon="el-icon-plus" style="float: right;" @click="handleAdd">Add Vehicle</el-button>
        </el-col>

      </el-row>
      <div></div>

      <el-row>
        <el-col :span="22" :offset="1">
          <el-table :data="dataList" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column prop="id" label="Vehicle Id" align="center" header-align="center" width="100"></el-table-column>
            <el-table-column prop="ofcId" label="office" align="center" header-align="center" width="150">
              <template slot-scope="scope">
                <span>{{ getOfficeLabel(scope.row.ofcId) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="make" label="Make" align="center" header-align="center"></el-table-column>
            <el-table-column prop="model" label="Model" align="center" header-align="center"></el-table-column>
            <el-table-column prop="year" label="Year" align="center" header-align="center"></el-table-column>
            <el-table-column prop="lpn" label="LPN" width="150" align="center" header-align="center"></el-table-column>
            <el-table-column prop="curLoc" label="Current Location" width="150" align="center" header-align="center">
              <template slot-scope="scope">
                <span>{{ getOfficeLabel(scope.row.curLoc) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="classId" label="Class" width="120" align="center" header-align="center">
              <template slot-scope="scope">
                <span>{{getClassLabel(scope.row.classId)}}</span>
              </template>
            </el-table-column>
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


    <el-dialog title="Edit Vehicle Information" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-row>
          <el-col :span="24">
              <div>
                <el-form-item label="Vehicle Id" prop="id">
                  <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Office Id" prop="ofcId">
                  <el-select
                    v-model="editForm.ofcId"
                    value-key="ofcId"
                    filterable
                    reserve-keyword
                    placeholder="SELECT BELONGING LOCATION">
                    <el-option
                      v-for="item in officeList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Make" prop="make">
                  <el-input v-model="editForm.make" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Model" prop="model">
                  <el-input v-model="editForm.model" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Year" prop="year">
                  <el-input v-model="editForm.year" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="LPN" prop="lpn">
                  <el-input v-model="editForm.lpn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Location" prop="curLoc">
                  <el-select
                    v-model="editForm.curLoc"
                    value-key="curLoc"
                    filterable
                    reserve-keyword
                    placeholder="SELECT CURRENT LOCATION">
                    <el-option
                      v-for="item in officeList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Class Id" prop="classId">
                  <el-select
                    v-model="editForm.classId"
                    value-key="classId"
                    filterable
                    reserve-keyword
                    placeholder="SELECT CLASS TYPE">
                    <el-option
                      v-for="item in classList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
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

    <el-dialog title="Add New Vehicle" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form-item label="Vehicle Id" prop="id">
                <el-input v-model="addForm.id" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="Office Id" prop="ofcId">
                <el-select
                  v-model="addForm.ofcId"
                  value-key="ofcId"
                  filterable
                  reserve-keyword
                  placeholder="SELECT BELONGING LOCATION">
                  <el-option
                    v-for="item in officeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Make" prop="make">
                <el-input v-model="addForm.make" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Model" prop="model">
                <el-input v-model="addForm.model" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Year" prop="year">
                <el-input v-model="addForm.year" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="LPN" prop="lpn">
                <el-input v-model="addForm.lpn" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="Location" prop="curLoc">
                <el-select
                  v-model="addForm.curLoc"
                  value-key="curLoc"
                  filterable
                  reserve-keyword
                  placeholder="SELECT CURRENT LOCATION">
                  <el-option
                    v-for="item in officeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Class Id" prop="classId">
                <el-select
                  v-model="addForm.classId"
                  value-key="classId"
                  filterable
                  reserve-keyword
                  placeholder="SELECT CLASS TYPE">
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
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
  import {getVehicleList, updateVehicleInfo, deleteVehicle, addVehicle} from "../../api/api";
  import { mapActions } from 'vuex';

  var defaultForm = {
    "id":"",
    "ofcId":"",
    "make":"",
    "model":"",
    "year":"",
    "lpn":"",
    "curLoc":"",
    "classId":""
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

          listLoading: false,

          officeList:[],
          classList:[]
        }
      },
      methods: {
        ...mapActions('d2admin/office', [
          'loadOfficeList',
        ]),
        ...mapActions('d2admin/vehicleClass', [
          'loadClassList'
        ]),
        getClassList: function () {
          this.loadClassList().then((res) => {
            this.classList = [];
            if (res.data.code !== 200) {
              return
            }
            let result = res.data.data;
            for (let i = 0; i < result.length; i++) {
              let record = {"id" : result[i].id, "label" : result[i].type};
              this.classList.push(record);
            }
          })
        },
        getClassLabel: function (id) {
          let c = this.classList.filter(function(p){
            return p.id === id;
          });
          return c[0].label
        },
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
          getVehicleList(para).then((res) => {
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
            deleteVehicle(row.id).then((res) => {
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
              addVehicle(para).then((res) => {
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
              updateVehicleInfo(para).then((res) => {
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
        this.loadDataList();
        this.getOfficeList();
        this.getClassList();
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
