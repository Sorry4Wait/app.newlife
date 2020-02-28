<template>
  <div>
    <mycrud
      :title="$t('user.list')"
      :controller="'user'"
      :action="'index'"
      :editUrl="'/admin/user/'"
      :createUrl="'/admin/user/create'"
    ></mycrud>
  </div>



</template>
<script>
  import Prism from 'vue-prism-component'
  import AuthService from "../../../services/auth.service";
  import mycrud from "../../../components/mycomponents/mycrud";

  export default {
    name: "Users",
    components: {
      Prism,
      mycrud
    },
    data() {
      return {

      }

    },
    methods: {

    },
    created() {
    },
    watch: {

    }
  }
</script>
<style>

</style>
