<template>
    <div class="content-wrapper">
       <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="d-flex justify-content-between">
                                <h3 class="card-title">Brand List</h3>
                                <el-button @click="BrandCreate()" type="primary" round>Add New <i class="el-icon-plus"></i></el-button>
                                </div>
                                <el-button @click.prevent="multipleDelete()" v-if="multipleSelection.length > 0" type="danger" size="small">Delete All</el-button>
                            </div>

                            <el-table
                                ref="multipleTable"
                                :data="brands.data"
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
                                width="300">
                                </el-table-column>

                                <el-table-column
                                fixed="right"
                                label="Operations">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click.prevent="editBrand(scope.row)">Edit</el-button>
                                    <el-button @click="deleteBrand(scope.row.id)" type="text" size="small">Delete</el-button>
                                </template>
                                </el-table-column>
                            </el-table>

                            <el-pagination
                            class="text-center"
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="brands.per_page"
                            layout="prev, pager, next"
                            :total="brands.total">
                            </el-pagination>

                        </div>
                    </div>
                </div>
            </div>
       </div>
        <el-dialog
            :title="form.id ? 'Edit Brand' : 'Add New Brand'"
            :visible.sync="BrandDialog"
            width="50%"
            center>
            <span>
                <el-form  label-width="120px" @submit.prevent="addNewBrand()">
                    <el-form-item label="Brand Name">
                        <el-input v-model="form.name" placeholder="Enter Brand name..."></el-input>
                        <span class="text-danger" v-if="errors['name']">{{errors['name'][0]}}</span>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="brandList()">Cancel</el-button>
                <el-button type="primary" v-if="!form.id" @click="addNewBrand()">Save</el-button>
                <el-button type="primary" v-else @click="updateBrand()">Update</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'brandList',
     data() {
      return {
        currentPage: 1,
        multipleSelection: [],
        BrandDialog: false,
        form: {

        },
        errors: {}
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
      brandList() {
        this.BrandDialog = false;
        this.$store.dispatch('brand/brandList', this.currentPage)
      },
      deleteBrand(id){
        this.$store.dispatch('brand/deleteBrand', id)
         this.$message({
          message: 'Brand Deleted Successfully....',
          type: 'success'
        });
      },
      addNewBrand(){
          axios.post('/admin/brand', this.form)
          .then((result) => {
            this.$message({
            message: 'Brand Added Successfully....',
            type: 'success'
            });
            this.clearData();
            this.brandList();
            this.BrandDialog = false;
          }).catch((err) => {
              this.errors = err.response.data.errors
          });
      },
      BrandCreate(){
          this.BrandDialog = true;
         this.clearData();
      },
      clearData(){
          this.errors = {}
          this.form = {}
      },
      editBrand(Brand){
          this.BrandDialog = true;
          this.form = Brand
      },
      updateBrand(){
          axios.put('/admin/brand/'+this.form.id, this.form)
          .then((result) => {
            this.$message({
            message: 'Brand Updated Successfully....',
            type: 'success'
            });
            this.clearData();
            this.brandList();
            this.BrandDialog = false;
          }).catch((err) => {
              this.errors = err.response.data.errors
          });
      },
      handleCurrentChange(){
        this.$store.dispatch('brand/brandList', this.currentPage)
      },
      multipleDelete(){
          axios.post('/admin/multiple-brand-delete', this.multipleSelection)
          .then((result) => {
            this.$message({
            message: 'Brand Delteted Successfully....',
            type: 'success'
            });
            this.brandList();
          }).catch((err) => {

          });

      }
    },
    created (){
        this.brandList();
    },
    computed: {
        brands(){
            return this.$store.getters['brand/brandList'];
        }
    }
}
</script>

<style>

</style>
