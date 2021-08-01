<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form class="submit-form" @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="username"
          rules="required"
        >
          <v-text-field
            v-model="username"
            :error-messages="errors"
            label="UserName"
            required
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:10"
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="phoneNumber"
          :rules="{
            required: true,
            digits: 10,
          }"
        >
          <v-text-field
            v-model="phoneNumber"
            :counter="10"
            :error-messages="errors"
            label="Phone Number"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="select" rules="required">
          <v-select
            v-model="dept"
            :items="items"
            :error-messages="errors"
            label="Select"
            data-vv-name="select"
            required
          ></v-select>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="password"
          rules="required"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
          @click="saveEmployee"
        >
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </validation-observer>

    <v-snackbar
      v-if="responseError"
      v-model="successsnackbar"
      color="primary"
      absolute
      right
      top
      :multi-line="multiLine"
    >
      {{ successText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          @click="successsnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-if="responseError" v-model="snackbar" :multi-line="multiLine">
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import UserService from "../services/emp-data-service";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "add-user",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    phoneNumber: "",
    username: "",
    password: "",
    email: "",
    dept: "",
    select: null,
    items: ["HR", "Admin", "Technical", "Finance"],
    responseError: false,
    multiLine: true,
    snackbar: false,
    successsnackbar: false,
    errorText: "",
    successText: "",
  }),
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.username = "";
      this.password = "";
      this.select = null;
      this.$refs.observer.reset();
    },

    saveEmployee() {
      var data = {
        name: this.name,
        username: this.username,
        password: this.password,
        phoneNumber: this.phoneNumber,
        email: this.email,
        department: this.dept,
      };

      UserService.create(data)
        .then((response) => {
          console.log(response, "ddddddddd");
          this.submitted = true;

          this.responseError = true;
          this.successsnackbar = true;
          this.successText = "Employee created Successfully";
        })
        .catch((e) => {
          console.log(e, "dsdsds", e.response.data.message);
          this.responseError = true;
          this.snackbar = true;
          this.errorText = e.response.data.message;
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};
</script>

<style class="css" scoped>
.submit-form {
  /* max-width: 50%; */
  /* margin: 30px; */
  padding: 30px;
}
</style>
