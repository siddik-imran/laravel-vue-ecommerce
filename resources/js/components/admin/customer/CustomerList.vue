<template>
    <div class="content-wrapper">
       <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                <h3 class="card-title">Customer List</h3>
                                </div>
                                <el-button  v-if="multipleSelection.length > 0" type="danger" size="small">Delete All</el-button>
                            </div>

                             <el-table
                                ref="multipleTable"
                                :data="users.data"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                label="Date"
                                width="120">
                                <template slot-scope="scope">{{ scope.row.created_at | timeFormate }}</template>
                                </el-table-column>
                                <el-table-column
                                property="name"
                                label="Name"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                property="email"
                                label="Email"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                            class="text-center"
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="users.per_page"
                            layout="prev, pager, next"
                            :total="users.total">
                            </el-pagination>

                        </div>
                    </div>
                </div>
            </div>
       </div>

    </div>
</template>

<script>
export default {
    name: 'CustomerList',
     data() {
      return {
        currentPage: 1,
        multipleSelection: []
      }
    },

    methods: {
        handleClick(){

        },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       handleCurrentChange(){
        this.$store.dispatch('user/userList', this.currentPage)
      },
      customerList(){
          this.$store.dispatch('user/userList', this.currentPage)
      }
    },
    created(){
        this.customerList();
    },
    computed:{
        users(){
            return this.$store.getters['user/userList'];
        }
    }
}
</script>

<style>

</style>
