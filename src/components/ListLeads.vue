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
            :items-per-page="10"
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
        { text: 'Name', value: 'lead_name' },
        { text: 'Created At', value: 'lead_created_date' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions' },
      ],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get('https://api.meetime.com.br/v2/leads', {headers: {'Authorization': 'CEjGRDXGAu8XcilvM9fzpInHBzH2cGes'}})
          .then(response => {
            this.responseHandler(response.data.data)
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
    responseHandler(resp) {
      this.list = resp.map((item) => {
        return {
          lead_name: item.lead_name,
          lead_created_date: item.lead_created_date,
          phone: this.searchPhone(item.phones)
        }
      })
    },
    searchPhone(phone) {
      if(phone) {
        return phone[0].phone
      }
      return null
    }
  }
}
</script>

<style scoped>

</style>