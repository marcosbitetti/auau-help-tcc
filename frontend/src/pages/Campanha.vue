<template>
  <div class="content">
    <div class="md-layout md-medium-size-100 md-xsmall-size-100 md-size-3">

      <form
        novalidate
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        @submit.prevent="">
        <md-card class="card-mural">

          <md-card-content>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </md-card-content>

          <md-card-actions>
            <md-button class="md-primary" v-on:click="atualizar()">Atualizar</md-button>
          </md-card-actions>
        </md-card>
      </form>


      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >

      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33" >

      </div>

    </div>

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

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  props: {
  },
  data() {
    return {
      editor:null,
      sending: false,

      editor: ClassicEditor,
      editorData: '<p>Carrgedo...</p>',
      editorConfig: {
        language: 'pt',
        contentsLanguage: 'pt',
        uiColor: '#9AB8F3',
      }
    };
  },
  methods: {
    atualizar: function() {
      const self = this
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{
          action:'updateCampanha',
          data: this.editorData,
        },
        headers:this.$api.headers,
      }).then((response) => {
        self.refresh()
      })
    },
    refresh: function() {
      const self = this
      self.sending = true
      this.axios({
        method:'POST',
        url:this.$api.baseUrl+'/',
        data:{action:'getCampanha'},
        headers:this.$api.headers,
      }).then((response) => {
        this.editorData = response.data.data
        self.sending = false
      })
    },
  },
  mounted() {
    this.refresh()
  },
  beforeDestroy() {

  },
};
</script>
