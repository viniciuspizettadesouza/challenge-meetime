<template>
  <v-card height="50px">
    <v-toolbar flat color="#3c3c3c">
      <div class="d-flex align-center">
        <v-img
            alt="Meetime Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://meetime.com.br/dashboard/assets/images/logo-inverse.png"
            width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="handleRouter('add')" plain class="link">
        <a class="link">Add Leads</a>
      </v-btn>
      <v-btn @click="handleRouter('leads')" plain class="link">
        <a class="link">List Leads</a>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import router from "../router";

export default {
  name: "AppHeader",
  methods: {
    handleRouter(route) {
      router.push(route)
    }
  }
}
</script>

<style scoped>
.link {
  color: #fff;
}
</style>