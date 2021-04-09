<template>
  <v-app>
    <AppHeader/>
    <router-view/>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import AppHeader from "./components/AppHeader";

export default {
  name: 'App',
  components: {
    AppHeader,
    HelloWorld,
  }
}
</script>
