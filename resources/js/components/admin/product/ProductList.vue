<template>
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                <h3 class="card-title">Product List</h3>

                                <router-link :to="{name: 'AddOrUpdateProduct'}" type="primary" round>Add New <i class="el-icon-plus"></i></router-link>
                                </div>
                                <el-button @click.prevent="multipleDelete()" v-if="multipleSelection.length > 0" type="danger" size="small">Delete All</el-button>
                            </div>

                            <el-table
                                ref="multipleTable"
                                :data="products.data"
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
                                width="200">
                                </el-table-column>

                                <el-table-column
                                property="price"
                                label="Price"
                                width="100">
                                </el-table-column>

                                <el-table-column
                                label="Category"
                                width="200">
                                 <template slot-scope="scope">{{ scope.row.category.name }}</template>
                                </el-table-column>

                                <el-table-column
                                label="Brand"
                                width="200">
                                 <template slot-scope="scope">{{ scope.row.brand.name }}</template>
                                </el-table-column>

                                <el-table-column
                                fixed="right"
                                label="Operations">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click.prevent="productDetails(scope.row)">Details</el-button>
                                    <router-link :to="{name: 'editProduct', params: {id: scope.row.id}}">Edit</router-link>
                                    <el-button @click.prevent="deleteProduct(scope.row.id)" type="text" size="small">Delete</el-button>
                                </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                            class="text-center"
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="products.per_page"
                            layout="prev, pager, next"
                            :total="products.total">
                            </el-pagination>

                        </div>
                    </div>
                </div>
            </div>
       </div>
       <!-- Product Details  -->
        <el-dialog
            :title="product.name"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <span>
                <h5 v-if="product.category">Category : {{product.category.name}}</h5>
                <h5 v-if="product.brand">Brand : {{product.brand.name}}</h5>
                <p>Description: {{product.description}}</p>
                <p><b>Price : {{product.price}}</b></p>
                <p><b>Discount Price : {{product.discount_price}}</b></p>
                <p><b>Quantity : {{product.quantity}}</b></p>
                <p><img :src="`/uploads/${product.image}`" alt="" width="100px"></p>
                <p>Size: <b v-for="(size, index) in product.size" :key="index">{{size}},</b></p>
                <p>Color:
                    <b v-for="color in product.color" :key="color">
                        <input type="color" :value="color">,
                    </b>
                </p>


            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    data(){
        return {
            currentPage: 1,
            multipleSelection: [],
            product: {},
            centerDialogVisible: false,
        }
    },
    methods: {

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
            this.$store.dispatch('product/productList', this.currentPage)
        },
        productList(){
            this.$store.dispatch('product/productList', this.currentPage)
        },
        deleteProduct(id){
            this.$store.dispatch('product/deleteProduct', id)
            this.$message({
            message: 'Product Deleted Successfully....',
            type: 'success'
            });
        },
        multipleDelete(){
            axios.post('/admin/multiple-product-delete', this.multipleSelection)
            .then((result) => {
                this.$message({
                message: 'Products Delteted Successfully....',
                type: 'success'
                });
                this.productList();
            }).catch((err) => {

            });
        },
        productDetails(row){
            this.product = row;
            this.centerDialogVisible = true;
        }

    },

    created(){
        this.productList();
    },
    computed:{
        products(){
            return this.$store.getters['product/productList'];
        }
    }
}
</script>

<style>

</style>
