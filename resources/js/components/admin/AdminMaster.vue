<template>
    <div id="admin_master">
        <div class="wrapper">

            <template  v-if="$route.name !== 'AdminLogin'">
                <!-- Navbar -->
                <admin-header></admin-header>
                <!-- Main Sidebar Container -->
                <admin-sidebar></admin-sidebar>
            </template>
            <!-- Content Wrapper. Contains page content -->
            <router-view></router-view>
            <!-- /.content-wrapper -->
            
            <!-- Admin Footer  -->
            <admin-footer v-if="$route.name !== 'AdminLogin'"></admin-footer>
        </div>
        <!-- ./wrapper -->
    </div>
</template>

<script>
import AdminFooter from "./inc/AdminFooter";
import AdminHeader from "./inc/AdminHeader";
import AdminSidebar from "./inc/AdminSidebar";
export default {
    name: "AdminMaster",
    components: {
        AdminFooter,
        AdminHeader,
        AdminSidebar
    }
};
</script>
