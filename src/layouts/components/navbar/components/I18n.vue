<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center i18n-locale">
      <img class="h-4 w-5" :src="i18n_locale_img" :alt="$i18n.locale" />
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateLocale('ru')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/ru.png" alt="pt" />  Russian</vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('uz')"><img class="h-4 w-5 mr-1" src="@/assets/images/flags/uz.png" alt="pt" />  Uzbek</vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  computed: {
    i18n_locale_img() {
      return require(`@/assets/images/flags/${this.$i18n.locale}.png`)
    },
    getCurrentLocaleData() {
        const locale = this.$i18n.locale;
        if (locale == "ru")      return { flag: "ru", lang: 'Russian'     }
        else if (locale == "uz") return { flag: "uz", lang: 'Uzbek' }

    },
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
  }
}
</script>
