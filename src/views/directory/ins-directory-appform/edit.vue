<template>
  <div>
    <div class="vx-col w-full mb-base vs-con-loading__container" id="userDetails">
      <vx-card>


        <ValidationObserver ref="form" v-slot="errors">
          {{setAllErrors(errors.errors)}}


          <div class="vx-row mb-2">

            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="id_department"
                                  :rules="{'required':true}">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-target"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('table.id_department')"
                  v-model="item.id_department"
                  :success=" !v.errors[0] ? true : false"
                  :danger=" v.errors[0] ? true : false"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="code"
                                  :rules="{'required':true}">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-code"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('table.code')"
                  v-model="item.code"
                  :success=" !v.errors[0] ? true : false"
                  :danger=" v.errors[0] ? true : false"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>

          </div>

        </ValidationObserver>
      </vx-card>

    </div>
    <div class="vx-col w-full mb-base">
      <vx-card>
        <vs-button class="mr-3 mb-2 float-right" @click="save()">{{$t('actions.update')}}</vs-button>
        <vs-button color="warning" type="border" class="mb-2">{{$t('actions.back')}}
        </vs-button>
      </vx-card>
    </div>

  </div>
</template>
<script>
  import CrudService from "../../../services/crud.service";
  import RoleService from "../../../services/role.service";

  export default {
    name: "edit",
    data() {
      return {
        item: {
          id_department: "",
          code: "",
        },
        roleList: [],
        allErrors: null,
      }
    },
    methods: {
      async save() {
        let vm = this;
        let obj = {}
        obj.InsDirectoryAppform = this.item;
        await CrudService.update('ins-directory-appform', obj).then(response => {
          if (response.data === true) {
            vm.makeToast(vm.$t('actions.messages.update_success'), vm.$t('actions.success'), 'success');
            setTimeout(() => {
              this.$router.push('/directory/ins-directory-appform').catch(() => {
              })
            }, 1000);
          } else {
            vm.makeToast(vm.$t('actions.messages.all_field_required'), vm.$t('actions.error'), 'danger');
          }

        });
      },
      setAllErrors(errors) {
        this.allErrors = errors;
      },
      async getAuthItem() {
        if (this.$route.params.id) {
          await CrudService.get('ins-directory-appform', this.$route.params.id).then(response => {
            this.item = response.data;
          });
        }

      },

    },
    async mounted() {
      await this.getAuthItem();
    },
    beforeCreate() {
      if (this.$route.params.id) {
        this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].title = this.$route.params.id;
      }
    },
    computed: {
      formValid() {
        let valid = false;
        for (const [key, value] of Object.entries(this.allErrors)) {
          if (value.length === 0) {
            valid = true;
          } else {
            valid = false;
          }
        }
        return valid;
      }
    }
  }
</script>
<style scoped>
  .con-select {
    width: 100% !important;
  }
</style>
