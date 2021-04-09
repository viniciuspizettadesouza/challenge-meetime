<template>
  <v-container>
    <v-row>
      <v-col>
        <p>Add lead</p></v-col>
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
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ]
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
      this.$v.$touch()
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