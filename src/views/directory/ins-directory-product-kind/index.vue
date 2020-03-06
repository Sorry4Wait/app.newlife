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
              <span class="mr-2">{{
                currentPage * filterData.limit - (filterData.limit - 1) }}
                - {{ users.length - currentPage * filterData.limit > 0
                ? currentPage * filterData.limit : users.length }} {{$t('actions.of')}} {{ totalItems }}</span>
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
          <vs-th sort-key="name_uz">{{$t('table.name_uz')}}</vs-th>
          <vs-th sort-key="name_ru">{{$t('table.name_ru')}}</vs-th>
          <vs-th>{{$t('actions.title')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr].name_uz">
              {{ data[indextr].name_uz}}
            </vs-td>
            <vs-td :data="data[indextr].name_ru">
              {{ data[indextr].name_ru }}
            </vs-td>
            <vs-td :data="data[indextr].actions">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-success stroke-current"
                            @click="edit(data[indextr])"/>
              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                            @click="openAlert(data[indextr])"/>
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
  import CrudService from "../../../services/crud.service";

  export default {
    name: "index",
    components: {
      Prism
    },
    data() {
      return {
        fields: [
          'name_ru',
          'name_uz',
          'actions',
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

        await CrudService.delete('ins-directory-product-kind', this.currentElement.id).then(response => {
          if (response.data === 1) {
            vm.makeToast(vm.$t('actions.messages.delete_success'), vm.$t('actions.success'), 'success');
            setTimeout(() => {
              vm.getList();
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
        this.$router.push('/directory/ins-directory-product-kind/update/' + el.id)
      },
      create() {
        this.$router.push('/directory/ins-directory-product-kind/create')
      },
      async getList() {
        let vm = this;
        vm.setLoadingDiv('data-list-list-view');
        await CrudService.index('ins-directory-product-kind', this.filterData).then(response => {
          this.total = Math.round((response.data.total / this.filterData.limit) > 1 ? Math.ceil(response.data.total / this.filterData.limit) : 1);
          this.totalItems = response.data.total;
          this.users = response.data.items;
        }).finally(() => {
          vm.stopLoadingContent('data-list-list-view');
        })
      }
    },
    async mounted() {
      await this.getList();
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
          this.getList();
        }
      }
    }
  }
</script>
<style>

</style>
