<template>
  <div>
    <p>
      {{ 'list' + list }}
      {{ 'error' + errors }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ListLeads",
  data() {
    return {
      list: [],
      errors: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get('https://api.meetime.com.br/v2/prospections', {headers: {'Authorization': 'CEjGRDXGAu8XcilvM9fzpInHBzH2cGes'}})
          .then(response => {
            this.list = response.data
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