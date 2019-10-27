<template>
  <div class="content">
    <div class="md-layout">

      <form
        v-for="item in empresas"
        novalidate
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        @submit.prevent="">
        <md-card class="card-loja">

          <md-card-content class="md-layout">

            <div class="md-layout-item image">
              <md-card-media >
                <img :src="item.content" xxxsrc="$api.baseUrl+'/'+item.imagem" :lowsrc="lowSrc" alt="icone" v-on:click="uploadImage(item)">
              </md-card-media>
            </div>

            <div class="md-layout-item">
              <md-field class="">
                <label for="first-name">Nome</label>
                <md-input name="first-name"  autocomplete="given-name" v-model="item.nome" :disabled="sending" />
              </md-field>

              <md-field class="">
                <md-checkbox v-model="item.destaque">Destaque</md-checkbox>
              </md-field>
            </div>

          </md-card-content>

          <md-card-actions>
            <md-button class="md-warning" v-on:click="confirmApagar(item)">Excluir</md-button>
            <md-button class="md-primary" v-on:click="atualizar(item)">Atualizar</md-button>
          </md-card-actions>
        </md-card>
      </form>


      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >

      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >

      </div>



    </div>
    <md-button class="md-primary add-item" v-on:click="addLoja">+</md-button>
    <div v-if="sending" class="loading"><md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner></div>
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


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  props: {
    lowSrc: {
      type: String,
      default: require("@/assets/img/favicon.png")
    },
  },
  data() {
    return {
      empresas:[],
      loja:{},
      sending: false,
    };
  },
  methods: {
    addLoja: function() {
      const self = this
      self.sending = true
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{action:'addEmpresa', nome:'Nova empresa',},
        headers:this.$api.headers,
      }).then((response) => {
        self.refresh()
      })
    },
    atualizar: function(item) {
      const self = this
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{
          action:'updateEmpresa',
          nome:item.nome,
          destaque:item.destaque?1:0,
          imagem: item.imagem,
          id:item.id,
        },
        headers:this.$api.headers,
      }).then((response) => {
        self.refresh()
      })
    },
    confirmApagar: function(item) {
      if(confirm("Apagar: " + item.nome)) this.apagar(item)
    },
    apagar: function(item) {
      const self = this
      self.sending = true
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{ action:'deleteEmpresa', id:item.id, },
        headers:this.$api.headers,
      }).then((response) => {
        self.refresh()
      })
    },
    uploadImage: function(item) {
      const self = this
      const _item = item
      let uploader = document.createElement('input')
      uploader.setAttribute('type','file')
      uploader.setAttribute('accept','image/png, image/jpeg')
      uploader.onchange = (e) => {
        self.sending = true
        toBase64(uploader.files[0]).then((data) => {
          this.axios({
            method:'POST',
            url:this.$api.baseUrl+'/',
            data:{
              action:'addMedia',
              data: data,
              idEmpresa: _item.id
            },
            headers:this.$api.headers,
          }).then((response) => {
            self.refresh()
          })
        })
      }
      uploader.click()
    },
    refresh: function() {
      // empresas
      const self = this
      self.sending = true
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{action:'getEmpresas'},
        headers:this.$api.headers,
      }).then((response) => {
        self.empresas = response.data.data.map((item) => {
          item.destaque = item.destaque==1
          return item
        })
        self.sending = false
      })
    },
  },
  mounted() {
    this.refresh()
  },
};
</script>
