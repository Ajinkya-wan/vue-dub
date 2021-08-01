<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="!['login'].includes($route.name)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-spacer></v-spacer>

          <v-img class="mr-3" src="@/assets/ega.png" height="30px" width="40px">
          </v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-img :aspect-ratio="16 / 9" src="@/assets/ega1.jpg">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <div class="subheading">{{ user.name }}</div>
            <div class="body-1">{{ user.email }}</div>
          </v-col>
        </v-row>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      absolute
      color="teal lighten-3"
      dark
      v-if="!['login'].includes($route.name)"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>EGA APPLICATION</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-chip
        class="ma-2"
        light
        label
        style="background:transparent; cursor:pointer"
        @click="logout()"
      >
        <v-icon left>mdi-stop-circle-outline</v-icon>
        <h4>logout</h4>
      </v-chip>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import router from "../src/Router";

export default {
  data: () => ({
    drawer: null,
    user: {
      name: JSON.parse(localStorage.getItem("username")),
      email: JSON.parse(localStorage.getItem("email")),
    },
    items: [
      {
        title: "Dashboard",
        icon: "mdi-account-group-outline",
        to: "/dashboard",
      },
      { title: "Admin", icon: "mdi-tablet-dashboard", to: "/admin" },
    ],
  }),

  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.clear();
      router.push("/login");
    },
  },
};
</script>
