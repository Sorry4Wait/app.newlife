<template>
  <div>

    <div id="data-list-list-view" class="data-list-container vs-con-loading__container">

      <vs-table ref="table"  v-model="selected" :max-items="filterData.limit" search :data="users" :noDataText="$t('actions.messages.empty_table')">

        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

          <div class="flex flex-wrap-reverse items-center data-list-btn-container">


            <vs-button color="primary" type="gradient" class="ml-auto" icon-pack="feather"
                       icon="icon-plus" @click="create">
              {{$t('actions.create')}}
            </vs-button>
          </div>

          <!-- ITEMS PER PAGE -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * filterData.limit - (filterData.limit - 1) }} - {{ users.length - currentPage * filterData.limit > 0 ? currentPage * filterData.limit : users.length }} of {{ totalItems }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="filterData.limit=2">
                <span>2</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterData.limit=4">
                <span>4</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterData.limit=10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterData.limit=15">
                <span>15</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="filterData.limit=20">
                <span>20</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <template slot="thead">
          <vs-th v-for="item in fields" :key="'key-'+item" sort-key="name">{{$t('table.'+item)}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr][tableTd]" v-for="tableTd,index in fields" :key="'key-'+tableTd">
              <template v-if="index === fields.length - 1">
                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-success stroke-current"
                              @click="edit(data[indextr])"/>
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                              @click="openAlert(data[indextr])"/>
              </template>
              <template v-else>
                <template v-if="Array.isArray(data[indextr][tableTd])">
                  <template v-for="el in data[indextr][tableTd]"
                  >
                    <div class="badge badge-danger mr-2">{{el}}</div>

                  </template>
                </template>
                <template v-else>
                  {{data[indextr][tableTd]}}
                </template>

              </template>

            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <br>
      <vs-pagination :total="total" v-model="filterData.page" class="small"></vs-pagination>
    </div>
  </div>


</template>
<script>
  import Prism from 'vue-prism-component'
  import AuthService from "../../../services/auth.service";
  import mycrud from "../../../components/mycomponents/mycrud";
  import CrudService from "../../../services/crud.service";

  export default {
    name: "AuthItems",
    components: {
      Prism,
      mycrud
    },
    data() {
      return {
        fields: [
          'name',
          'description_ru',
          'actions'
        ],
        selected: [],
        users: [],
        total: 0,
        totalItems:0,
        filterData: {
          search: "",
          page: 1,
          limit: 10,
        },
        currentElement: null,
      }

    },
    methods: {
      openAlert(el) {
        this.currentElement = el;
        this.$vs.dialog({
          color: 'danger',
          title: this.$t('actions.delete'),
          text: this.$t('actions.messages.delete_title'),
          acceptText: this.$t('actions.delete'),
          accept: this.deleteEl
        })
      },
      async deleteEl() {
        let vm = this;

        await CrudService.delete('auth-item', this.currentElement.name).then(response => {
          if (response.data === 1) {
            vm.makeToast(vm.$t('actions.messages.delete_success'), vm.$t('actions.success'), 'success');
            setTimeout(() => {
              vm.getUserList();
            }, 1000)
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
        this.$router.push('/admin/auth-items/update/' + el.name)
      },
      create() {
        this.$router.push('/admin/auth-items/create')
      },
      async getUserList() {
        let vm = this;
        vm.setLoadingDiv('data-list-list-view');
        await CrudService.index('auth-item', this.filterData).then(response => {
          this.total = Math.round((response.data.total / this.filterData.limit) > 1 ? Math.ceil(response.data.total / this.filterData.limit) : 1);
          this.totalItems = response.data.total;
          this.users = response.data.items;
        }).finally(() => {
          vm.stopLoadingContent('data-list-list-view');
        })
      }
    },
    async mounted() {
      await this.getUserList();
    },
    computed:{
      currentPage() {
        return 1
      },
    },
    watch: {
      filterData: {
        deep:true,
        handler(newValue) {
          this.getUserList();
        }
      }
    }
  }
</script>
<style>

</style>
