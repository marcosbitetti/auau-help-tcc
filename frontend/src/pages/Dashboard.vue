<template>
  <div class="content">
    <div class="md-layout">


      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50" >
        <chart-card
          :cardVideo="cardVideo1"
          data-background-color="blue"
        >

          <template slot="content">
            <h4 class="title">Empresas</h4>
            <p class="category">
              <span class="text-success">{{numEmpresas}}</span>
              inscritas
            </p>
          </template>

          <template slot="footer">
            <div style="width:100%; text-align: right;">
              <router-link to="/empresas">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </template>
        </chart-card>
      </div>


      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50" >
        <chart-card
          :cardVideo="cardVideo2"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Lojas</h4>
            <p class="category">
              <span class="text-success">{{numLojas}}</span>
              inscritas
            </p>
          </template>

          <template slot="footer">
            <div style="width:100%; text-align: right">
              <router-link to="/lojas">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </template>
        </chart-card>
      </div>


      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
        <md-card class="sub-card">
          <md-card-content>
            <h4 class="title">Campanhas</h4>
          </md-card-content>
          <md-card-footer>
            <div style="width:100%; text-align: right">
              <router-link to="/campanha">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </md-card-footer>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
        <md-card class="sub-card">
          <md-card-content>
            <h4 class="title">Pontos de Vendas</h4>
          </md-card-content>
          <md-card-footer>
            <div style="width:100%; text-align: right">
              <router-link to="/pdv">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </md-card-footer>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
        <md-card class="sub-card">
          <md-card-content>
            <h4 class="title">OAB</h4>
          </md-card-content>
          <md-card-footer>
            <div style="width:100%; text-align: right">
              <router-link to="/oab">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </md-card-footer>
        </md-card>
      </div>

      <!--<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >
        <chart-card
          :cardVideo="cardVideo3"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Mural</h4>
            <p class="category">
              &nbsp;
            </p>
          </template>

          <template slot="footer" style="align-items: flex-end">
            <div style="width:100%; text-align: right">
              <router-link to="/mural">
                <md-button class="md-raised md-primary">Editar</md-button>
              </router-link>
            </div>
          </template>
        </chart-card>
      </div>-->



    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  props: {
    cardVideo1: {
      type: String,
      default: require("@/assets/videos/vokoscreen-2019-09-19_08-25-43.mp4")
    },
    cardVideo2: {
      type: String,
      default: require("@/assets/videos/vokoscreen-2019-09-19_12-47-23.mp4")
    },
    cardVideo3: {
      type: String,
      default: require("@/assets/videos/vokoscreen-2019-09-19_12-48-30.mp4")
    },
  },
  data() {
    return {
      numEmpresas: 0,
      numLojas: 0,
    };
  },
  methods: {
  },
  mounted() {
    const self = this

    // lojas
    this.axios({
      method:'POST',
      url:this.$api.baseUrl+'/',
      data:{action:'getLojas'},
      headers:this.$api.headers,
    }).then((response) => {
      //console.log(response.data)
      self.numLojas = response.data.data.length
    })

    // empresas
    this.axios({
      method:'POST',
      url:this.$api.baseUrl+'/',
      data:{action:'getEmpresas'},
      headers:this.$api.headers,
    }).then((response) => {
      //console.log(response.data)
      self.numEmpresas = response.data.data.length
    })
  },
};
</script>
