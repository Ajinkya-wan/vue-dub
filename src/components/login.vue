<template>
  <div class="section-container">
    <v-snackbar
      v-if="responseError"
      v-model="snackbar"
      :multi-line="multiLine"
      right
      top
    >
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row class="signin">
      <v-col cols="8" class="left">
        <h1>Welcome to EGA</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>LOGIN</h2>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="username"
            label="username"
            required
            outlined
            dark
            filled
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            required
            outlined
            dense
            dark
            filled
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>

          <div class="text-center">
            <v-btn class="signin-btn" type="submit" rounded color="white" dark>
              Sign In
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthService from "../services/auth.service";

export default {
  data: () => ({
    username: "",
    password: null,
    showPass: false,
    responseError: false,
    multiLine: true,
    snackbar: false,
  }),
  computed: {
    params() {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },
  methods: {
    async submit() {
      AuthService.login(this.params)
        .then((response) => {
          console.log(response, "Ajinkya");
          this.$emit("changeTitle", "Awesome ");
        })
        .catch((e) => {
          console.log(e);
          this.responseError = true;
          this.snackbar = true;
          this.errorText = "login failed! please enter valid credentials";
        });

      //   }
    },
    clear() {
      this.username = "";
      this.password = null;
      this.$refs.observer.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.section-container {
  padding: 60px;
  //   margin: 20px;
  background-image: url("../assets/ega2.jpg");
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  //   width: 100%;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  box-sizing: border-box;
  .signin {
    padding: 0;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 600px;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    .left {
      //   padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #30ac7c;
      background-color: #f9f9f9;
    }
    .right {
      //  padding: 30px;
      box-sizing: border-box;
      background: #30ac7c;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #30ac7c;
      }
    }
  }
}
</style>
