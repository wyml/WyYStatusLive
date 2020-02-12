<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary">
        <v-toolbar-title>WyY's Status Live</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>{{ $vuetify.theme.dark?'mdi-brightness-7':'mdi-brightness-4' }}</v-icon>
        </v-btn>
        <v-btn icon href="https://github.com/wyml/WyYStatusLive" target="_blank">
          <v-icon>mdi-github-face</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <router-view />
      </v-content>

      <v-footer color="primary lighten-1 mt-5">
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="(link,index) in links"
            :key="index"
            color="white"
            text
            rounded
            class="my-2"
            :href="link.to"
            target="_blank"
          >
            <v-icon>{{ link.icon }}</v-icon>
            {{ link.text }}
          </v-btn>
          <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
            &copy; {{ new Date().getFullYear() }} —
            <strong>
              <a href="https://blog.kingsr.cc">WyY's</a>
            </strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  created() {
    document.title = process.env.VUE_APP_TITLE;
  },
  data() {
    return {
      links: [
        {
          text: "首页",
          icon: "mdi-home",
          to: "https://blog.kingsr.cc"
        },
        {
          text: "GITHUB",
          icon: "mdi-github-face",
          to: "https://github.com/wyml"
        },
        {
          text: "微博",
          icon: "mdi-sina-weibo",
          to: "https://weibo.com/lebgf"
        },
        {
          text: "Twitter",
          icon: "mdi-twitter",
          to: "https://twitter.com/Wyy35777976"
        }
      ]
    };
  }
};
</script>