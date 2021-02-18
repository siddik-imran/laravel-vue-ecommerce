<template>
  <div class="content-wrapper">
       <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                <h3 class="card-title">Order List</h3>
                                </div>
                                <el-button  v-if="multipleSelection.length > 0" type="danger" size="small">Delete All</el-button>
                            </div>

                             <el-table
                                ref="multipleTable"
                                :data="orders.data"
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
                                property="payment_type"
                                label="Payment Type"
                                width="140">
                                </el-table-column>
                                <el-table-column
                                property="total"
                                label="Total"
                                show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                property="status"
                                label="Status"
                                show-overflow-tooltip>
                                </el-table-column>

                                 <el-table-column
                                fixed="right"
                                label="Operations">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click.prevent="orderDetails(scope.row.id)">Details</el-button>
                                    <el-button @click.prevent="deleteProduct(scope.row.id)" type="text" size="small">Delete</el-button>
                                </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                            class="text-center"
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="orders.per_page"
                            layout="prev, pager, next"
                            :total="orders.total">
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
    name: 'UserDashboard',
    data() {
      return {
        currentPage: 1,
        multipleSelection: []
      }
    },
    methods: {
        getUser(){
           this.$store.dispatch('user/getUser');
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
        this.$store.dispatch('order/userOrderList', this.currentPage)
      },
      orderList(){
          this.$store.dispatch('order/userOrderList', this.currentPage)
      },
      orderDetails(id){
          this.$router.push({name: 'OrderDetails', params:{orderId: id}});
      }
    },
    created(){
        this.getUser();
        this.orderList();
    },
    computed: {
        user(){
           return this.$store.getters['user/getAuthUser']
        },
         orders(){
            return this.$store.getters['order/orderList'];
        }
    },
}
</script>

<style>

</style>
