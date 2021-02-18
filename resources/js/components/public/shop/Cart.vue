<template>
    <!-- cart content section start -->
    <section class="pages cart-page section-padding">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="table-responsive padding60">
                        <table class="wishlist-table text-center">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in products.products" :key="item.id">
                                    <td class="td-img text-left">
                                        <a href="#"><img :src="`/uploads/${item.attributes['image']}`" alt="Add Product" /></a>
                                        <div class="items-dsc">
                                            <h5><a href="#">{{item.name}}</a></h5>
                                            <p class="itemcolor">Color : <span>{{item.attributes['color']}}</span></p>
                                            <p class="itemcolor">Size   : <span>{{item.attributes['size']}}</span></p>
                                        </div>
                                    </td>
                                    <td>${{item.price}}</td>
                                    <td>
                                        <form action="#" method="POST">
                                            <div class="plus-minus">
                                                <a class="dec qtybutton">-</a>
                                                <input type="text" @keypress.enter.prevent="updateQty(item.id, item.quantity)" v-model="item.quantity" value="02" name="qtybutton" class="plus-minus-box">
                                                <a class="inc qtybutton">+</a>
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                        <strong>${{item.price * item.quantity}}</strong>
                                    </td>
                                    <td @click.prevent="removeProduct(item.id)"><i class="mdi mdi-close" title="Remove this product"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row margin-top">
                <div class="col-sm-6">
                    <div class="single-cart-form padding60">
                        <div class="log-title">
                            <h3><strong>coupon discount</strong></h3>
                        </div>
                        <div class="cart-form-text custom-input">
                            <p>Enter your coupon code if you have one!</p>
                            <form action="mail.php" method="post">
                                <input type="text" name="subject" placeholder="Enter your code here..." />
                                <div class="submit-text coupon">
                                    <button type="submit">apply coupon </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="single-cart-form padding60">
                        <div class="log-title">
                            <h3><strong>payment details</strong></h3>
                        </div>
                        <div class="cart-form-text pay-details table-responsive">
                            <table>
                                <!-- <tbody>
                                    <tr>
                                        <th>Cart Subtotal</th>
                                        <td>$155.00</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping and Handing</th>
                                        <td>$15.00</td>
                                    </tr>
                                    <tr>
                                        <th>Vat</th>
                                        <td>$00.00</td>
                                    </tr>
                                </tbody> -->
                                <tfoot>
                                    <tr>
                                        <th class="tfoot-padd">Order total</th>
                                        <td class="tfoot-padd">${{products.total}}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
		<!-- cart content section end -->
</template>

<script>
export default {
    name: 'Cart',
    data(){
        return{
            item: {
                quantity: 1,
            }
        }
    },
    methods: {
        productList(){
            this.$store.dispatch('cart/productList');
        },
        removeProduct(id){
            axios.get('cart/remove-product/'+id)
            .then((result) => {
                this.productList();
                this.$message({
                message: 'Product remove from cart....',
                type: 'success'
                });
            }).catch((err) => {

            });
        },
        updateQty(id, qty){
            axios.post(`cart/update-cart`, {id: id, qty: qty})
            .then((result) => {
                this.productList();
            }).catch((err) => {

            });
        }
    },
    created(){
        this.productList();
    },
    computed: {
        products(){
            return this.$store.getters['cart/productList'];
        },
    }
}
</script>

<style>

</style>
