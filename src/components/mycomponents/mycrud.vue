<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full mb-base">
        <vx-card :title="title">
          <!-- SLOT = ACTION -->
          <template slot="actions">
            <vs-button color="primary" type="gradient" class="ml-auto" icon-pack="feather"
                       icon="icon-plus" @click="create">
              {{$t('actions.create')}}
            </vs-button>
          </template>
          <div class="flex">

          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full mb-base vs-con-loading__container" id="indexList">
        <vx-card>
          <vs-table v-model="selected"  @selected="handleSelected" :max-items="filter.limit" search :data="users">

            <template slot="thead">
              <vs-th>first_name</vs-th>
              <vs-th>last_name</vs-th>
              <vs-th>login</vs-th>
              <vs-th>status</vs-th>
              <vs-th>department_id</vs-th>
              <vs-th>{{$t('actions.title')}}</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                <vs-td :data="data[indextr].first_name">
                  {{data[indextr].first_name}}
                </vs-td>

                <vs-td :data="data[indextr].last_name">
                  {{data[indextr].last_name}}
                </vs-td>

                <vs-td :data="data[indextr].login">
                  {{data[indextr].login}}
                </vs-td>

                <vs-td :data="data[indextr].status">
                  {{data[indextr].status}}
                </vs-td>
                <vs-td :data="data[indextr].department_id">
                  {{data[indextr].department_id}}
                </vs-td>
                <vs-td>
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-success stroke-current"  @click="edit(data[indextr])" />
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"  @click="openAlert(data[indextr])"/>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <br>
          <vs-pagination :total="total" v-model="filter.page" class="small"></vs-pagination>
        </vx-card>
      </div>

    </div>
  </div>
</template>
<script>
  import Prism from 'vue-prism-component'
  import AuthService from "../../services/auth.service";
  import CrudService from "../../services/crud.service";

  export default {
    name: "mycrud",
    props: {
      title: {
        default: null,
      },
      controller: {
        type: String,
      },
      action: {
        type: String,
      },
      editUrl: {
        type: String,
      },
      createUrl: {
        type: String,
      }
    },
    components: {
      Prism
    },
    data() {
      return {
        selected: [],
        users: [],
        total: 0,
        filter: {
          search: "",
          page: 1,
          limit: 10,
        },
        currentElement:null,
      }

    },
    methods: {
      openAlert(el){
        this.currentElement = el;
        this.$vs.dialog({
          color:'danger',
          title: this.$t('actions.delete'),
          text: this.$t('actions.messages.delete_title'),
          acceptText:this.$t('actions.delete'),
          accept:this.deleteEl
        })
      },
      async deleteEl() {
        let vm = this;
        await CrudService.delete(this.controller, this.currentElement.id).then(response => {
          if (response.data === 1) {
            vm.makeToast(vm.$t('actions.messages.delete_success'), vm.$t('actions.success'), 'success');
            setTimeout(() =>{
              vm.getUserList();
            },1000)
          } else {

            vm.makeToast(vm.$t('actions.messages.server_error'), vm.$t('actions.error'), 'danger');
          }

        });
      },
      handleSelected(tr) {
        // this.$vs.notify({
        //   title: `Selected ${tr.name}`,
        //   text: `Email: ${tr.email}`
        // })
      },
      edit(el) {
        this.$router.push(this.editUrl + el.id)
      },
      create() {
        this.$router.push(this.createUrl)
      },
      async getUserList() {
        let vm = this;
        vm.setLoadingDiv('indexList');
        await CrudService[this.action](this.controller, this.filter).then(response => {
          this.total = (response.data.total / this.filter.limit) > 1 ? response.data.total / this.filter.limit : 1;
          this.users = response.data.items;
        }).finally(() => {
          vm.stopLoadingContent('indexList');
        })
      }
    },
    async mounted() {
      await this.getUserList();
    },
    watch: {
      'filter.page': {
        handler(newValue) {
          this.getAuth();
        }
      }
    }
  }
</script>
<style>
  .vs-button.includeIcon {
    float: left;
  }
</style>
