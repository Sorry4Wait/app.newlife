<template>
  <div class="vx-row">
    <div class="vx-row">

      <!-- SALES CHART - RADIAL -->
      <div class="vx-col w-full mb-base">

      </div>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card :title="$t('user.list')">
        <!-- SLOT = ACTION -->
        <template slot="actions">
          <vs-button color="primary" size="small" type="gradient" class="ml-auto" icon-pack="feather" icon="icon-plus">{{$t('actions.create')}}</vs-button>
        </template>
        <div class="flex">

        </div>
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
    <vx-card>
      <vs-table multiple v-model="selected" @selected="handleSelected" :data="users">

        <template slot="thead">
          <vs-th>Email</vs-th>
          <vs-th>Name</vs-th>
          <vs-th>Website</vs-th>
          <vs-th>Nro</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr].email">
              {{data[indextr].email}}
            </vs-td>

            <vs-td :data="data[indextr].username">
              {{data[indextr].username}}
            </vs-td>

            <vs-td :data="data[indextr].website">
              {{data[indextr].website}}
            </vs-td>

            <vs-td :data="data[indextr].id">
              {{data[indextr].id}}
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    </div>

  </div>


</template>
<script>
  import Prism from 'vue-prism-component'
  export default {
    name: "Users",
    components: {
      Prism
    },
    data(){
      return {
        selected: [],
        users: [
          {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "website": "hildegard.org",
          },
          {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "website": "anastasia.net",
          },
          {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "website": "ramiro.info",
          },
          {
            "id": 4,
            "name": "Patricia Lebsack",
            "username": "Karianne",
            "email": "Julianne.OConner@kory.org",
            "website": "kale.biz",
          },
          {
            "id": 5,
            "name": "Chelsey Dietrich",
            "username": "Kamren",
            "email": "Lucio_Hettinger@annie.ca",
            "website": "demarco.info",
          },
          {
            "id": 6,
            "name": "Mrs. Dennis Schulist",
            "username": "Leopoldo_Corkery",
            "email": "Karley_Dach@jasper.info",
            "website": "ola.org",
          },
          {
            "id": 7,
            "name": "Kurtis Weissnat",
            "username": "Elwyn.Skiles",
            "email": "Telly.Hoeger@billy.biz",
            "website": "elvis.io",
          },
          {
            "id": 8,
            "name": "Nicholas Runolfsdottir V",
            "username": "Maxime_Nienow",
            "email": "Sherwood@rosamond.me",
            "website": "jacynthe.com",
          },
          {
            "id": 9,
            "name": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io",
            "website": "conrad.com",
          },
          {
            "id": 10,
            "name": "Clementina DuBuque",
            "username": "Moriah.Stanton",
            "email": "Rey.Padberg@karina.biz",
            "website": "ambrose.net",
          },
        ]
      }

    },
    methods:{
      handleSelected(tr) {
        // this.$vs.notify({
        //   title: `Selected ${tr.name}`,
        //   text: `Email: ${tr.email}`
        // })
      }
    }
  }
</script>
<style>

</style>
