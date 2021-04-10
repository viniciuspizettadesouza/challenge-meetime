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
              :items="cadencesNames"
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
              :counter="20"
              label="Name"
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
          <v-text-field
              v-model="phone"
              :error-messages="phoneErrors"
              label="Phone"
              required
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
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
        <p v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p v-if="submitStatus === 'PENDING'">Sending...</p>
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
    name: {maxLength: maxLength(20)},
    email: {required, email},
    select: {required},
    phone: {required}
  },

  data() {
    return {
      name: '',
      email: '',
      select: null,
      phone: '',
      cadencesResponse: [],
      cadencesNames: [],
      errors: [],
      submitStatus: null
    }
  },
  mounted() {
    this.getCadences()
  },
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
      !this.$v.name.maxLength && errors.push('Name must be at most 20 characters long')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone is required')
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return null
      } else {
        this.submitStatus = 'PENDING'
        const cadence = this.cadencesResponse.find(item => {
          return item ? item.name === this.select : false
        })

        if (cadence) {
          const params = this.handleParams()
          axios.post(`https://api.meetime.com.br/v2/prospections/cadence/${cadence.id}/lead?token=${cadence.token}`, params)
              .catch(e => {
                this.errors.push(e)
              })
        }
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    handleParams() {
      return {
        "email": this.email,
        "name": this.name,
        "phones": [
          {
            "phone": this.phone
          }
        ],
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.phone = ''
    },
    getCadences() {
      axios.get('https://api.meetime.com.br/v2/cadences', {headers: {'Authorization': 'CEjGRDXGAu8XcilvM9fzpInHBzH2cGes'}})
          .then(response => {
            this.cadencesResponse = response.data.data
            this.cadencesNames = this.cadencesResponse.map((item) => {
              return item.name
            })
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
  },
}
</script>

<style scoped>

</style>