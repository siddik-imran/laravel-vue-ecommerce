<template>
    <div id="admin_login" class="hold-transition login-page">
            <div class="login-box">
        <div class="login-logo">
            <a href="#"><b>Admin</b></a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
            <p class="login-box-msg">Admin Login</p>

      <form action="../../index3.html" method="post" @submit.prevent="AdminLogin()">
        <div class="input-group mb-3">
          <input type="email" v-model="form.email" class="form-control" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <span class="text-danger" v-if="errors['email']">{{errors['email'][0]}}</span>
        <div class="input-group mb-3">
          <input type="password" v-model="form.password" class="form-control" placeholder="Password">

          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <span class="text-danger" v-if="errors['password']">{{errors['password'][0]}}</span>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>



      <p class="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>

    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

    </div>
</template>

<script>
export default {
    name: 'AdminLogin',
    data() {
        return{
            errors: {},
            form: {}
        }
    },
    methods: {
        AdminLogin(){
            axios.post('/admin/login', this.form)
            .then((result) => {
                localStorage.setItem('adminLoggedIn', JSON.stringify(result.data))
                this.$router.push({name: 'AdminDashboard'});
            }).catch((err) => {
                this.errors = err.response.data.errors
            });
        }
    }
}
</script>

<style>

</style>
