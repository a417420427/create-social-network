<template>
  <div class="login-page">
    <form class="login-page-signin dp-f">
      <input
        autocomplete="current-password"
        :placeholder="$t('loginUser')"
        v-model="emailOrUsername"
        type="text"
      />
      <input
        autocomplete="current-password"
        :placeholder="$t('password')"
        v-model="password"
        type="password"
      />
      <button type="button" @click="handleSignIn">{{$t('login')}}</button>
    </form>
    <div class="login-page-signup">
      <form class="signup-box">
        <h3 class="title">{{$t('createAccount')}}</h3>
        <input
          autocomplete="current-password"
          :placeholder="$t('fullName')"
          type="text"
          v-model="fullName"
        />
        <input
          autocomplete="current-password"
          :placeholder="$t('email')"
          type="text"
          v-model="email"
        />
        <input
          autocomplete="current-password"
          :placeholder="$t('username')"
          type="text"
          v-model="username"
        />
        <input
          autocomplete="current-password"
          :placeholder="$t('password')"
          type="password"
          v-model="signUpPassword"
        />
        <button @click="handleSignUp" type="button">{{$t('signup')}}</button>
      </form>
    </div>
  </div>
</template>
<script>
import { signIn, signUp } from '../../request/user';
// { fullName, email, password, username },
export default {
  data() {
    return {
      emailOrUsername: '',
      password: '',
      fullName: '',
      email: '',
      signUpPassword: '',
      username: '',
    };
  },
  methods: {
    async handleSignIn() {
      const result = await signIn({
        emailOrUsername: this.emailOrUsername,
        password: this.password,
      });
      if (result && result.data) {
        localStorage.setItem('token', result.data.signin.token);
        location.reload();
      }
    },
    async handleSignUp() {
      const result = await signUp({
        username: this.username,
        password: this.signUpPassword,
        email: this.email,
        fullName: this.fullName,
      });
      if (result && result.data) {
        localStorage.setItem('token', result.data.signup.token);
        location.reload();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url('./background.jpeg');
  background-size: cover;
  background-position: center center;
  &-signin {
    padding: 20px 20px 0;
    justify-content: center;
    > input {
      margin-right: 10px;
      line-height: 36px;
      text-indent: 10px;
      font-size: 14px;
      width: 120px;
      border: none;
      outline: none;
      background: #fff;
      color: $colors-textSecondary;
      border-radius: 3px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
    }
    > button {
      background: $colors-primaryMain;
      color: #fff;
      border: none;
      border-radius: 3px;
      padding: 0 15px;
    }
  }
  &-signup {
    padding: 50px 20px 0;
    box-sizing: border-box;
    .signup-box {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      text-align: center;
      > h3 {
        font-size: 24px;
        line-height: 40px;
        text-align: center;
      }
      > input {
        display: block;
        margin-top: 20px;
        line-height: 36px;
        text-indent: 10px;
        font-size: 14px;
        width: 100%;
        border: none;
        outline: none;
        background: #fff;
        color: $colors-textSecondary;
        border-radius: 3px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
      }
      > button {
        margin-top: 20px;
        padding: 0 15px;
        width: 200px;
        line-height: 40px;
        font-size: 14px;
        background: $colors-primaryMain;
        color: #fff;
        border: none;
        border-radius: 3px;
      }
    }
  }
}
</style>