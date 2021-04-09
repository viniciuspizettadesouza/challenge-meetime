<template>
  <v-container>
    <v-row>
      <v-col class="mt-16">
        <h1>Add lead</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form>
          <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Cadence"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              outlined
          ></v-select>
          <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              outlined
          ></v-text-field>
          <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              outlined
          ></v-text-field>

          <v-btn @click="clear" plain>
            CLEAN
          </v-btn>
          <v-btn
              class="mr-4"
              @click="submit"
              plain
          >
            SUBMIT
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import axios from "axios";

export default {
  name: "AddLeads",
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    select: {required},
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    name: '',
    email: '',
    select: null,
    items: [
      'Cadence 1',
      'Cadence 2',
      'Cadence 3',
      'Cadence 4',
    ],
    errors: []
  }),
  computed: {
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Cadence is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    submit() {
      const params = this.handleParams()

      const body = JSON.stringify(params)
      console.log(body)
      axios.post(`https://api.meetime.com.br/v2/prospections/cadence/${params.id}/lead`, body, {headers: {'Authorization': 'CEjGRDXGAu8XcilvM9fzpInHBzH2cGes'}})
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
      this.postLead(params)
    },
    handleParams() {
      const params = {
        "city": "Florianópolis",
        "company": "Acme",
        "email": "example@example.com",
        "facebook": "",
        "firstName": "Joe",
        "id": 1,
        "inboud": true,
        "linkedIn": "",
        "name": "Joe Doe",
        "originType": "IMPORTED_FROM_LIST",
        "phones": [
          {
            "label": "",
            "lastUsage": "2021-03-24T22:59:19.86Z",
            "phone": "1234-1234"
          }
        ],
        "position": "Head of naming",
        "site": "https://acme.corp",
        "state": "Santa Catarina",
        "status": "WAITING",
        "twitter": ""
      }
      return params
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>

<style scoped>

</style>