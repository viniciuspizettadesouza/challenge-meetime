<template>
  <v-container>
    <v-row>
      <v-col class="mt-16">
        <h1>List leads</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "ListLeads",
  data() {
    return {
      list: [],
      errors: [],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Token', value: 'token' },
        { text: 'API_endpoint', value: 'api_endpoint' },
      ],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get('https://api.meetime.com.br/v2/cadences', {headers: {'Authorization': 'CEjGRDXGAu8XcilvM9fzpInHBzH2cGes'}})
          .then(response => {
            this.list = response.data.data
            console.log(this.list)
          })
          .catch(e => {
            this.errors.push(e)
          })
    }
  }
}
</script>

<style scoped>

</style>