<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/empresas">
        <md-icon>account_balance</md-icon>
        <p>Empresas</p>
      </sidebar-link>
      <sidebar-link to="/lojas">
        <md-icon>home</md-icon>
        <p>Lojas</p>
      </sidebar-link>
      <sidebar-link to="/campanha">
        <md-icon>library_books</md-icon>
        <p>Campanha</p>
      </sidebar-link>
      <sidebar-link to="/pdv">
        <md-icon>library_books</md-icon>
        <p>Ponto de Venda</p>
      </sidebar-link>
      <sidebar-link to="/oab">
        <md-icon>library_books</md-icon>
        <p>OAB</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
