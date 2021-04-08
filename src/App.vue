<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <HelloWorld/>
    </v-main>
    <router-view/>
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
