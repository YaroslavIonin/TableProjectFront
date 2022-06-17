<template>
  <div class="register_page">
    <div style="padding: 15px">
      <div class="title">
        <h3 style="padding-top: 10px;">
          Регистрация
        </h3>
      </div>
    </div>
    <form v-on:submit.prevent="signIn">
      <div style="padding: 15px">
        <h5 style="color: red" v-show="usernameError">Пользователь с таким именем уже существует</h5>
        <div class="input_group">
          <img width="33" src="../assets/user.svg">
          <input class="input" v-model="username" type="text" placeholder="Придумайте имя" required>
        </div>
      </div>
      <div style="padding: 15px">
        <div class="input_group">
          <img width="33" src="../assets/user.svg">
          <input class="input" v-model="email" type="email" placeholder="Введите email" required>
        </div>
      </div>
      <div style="padding: 15px">
        <h5 style="color: red" v-show="passwordError">Пароли не совпадают</h5>
        <div class="input_group">
          <img width="33" src="../assets/pswrd.svg">
          <input class="input" v-model="password" type="password" placeholder="Придумайте пароль" required>
        </div>
      </div>
      <div style="padding: 15px">
        <h5 style="color: red" v-show="passwordError">Пароли не совпадают</h5>
        <div class="input_group">
          <img width="33" src="../assets/pswrd.svg">
          <input class="input" v-model="confirm_password" type="password" placeholder="Повторите пароль" required>
        </div>
      </div>
      <div style="text-align: center;">
        <button class="btn login_to" type="submit">Войти</button><br><br><br>
        <a class="to_login" href="#" v-on:click="this.$router.push({name: 'LogIn'})">У меня есть аккаунт</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      passwordError: false,
      usernameError: false,
      users: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  },
  methods: {
    async getUsers() {
      this.users = await fetch(
          "http://127.0.0.1:8000/api/v1/users/"
      ).then(response => {
        if (response.ok)
          return response.json()
      })
    },
    signIn() {
      this.passwordError = false
      this.usernameError = false
      this.getUsers().then(() => {
        for (let i in this.users) {
          if (this.users[i].username === this.username) {
            this.usernameError = true
            return
          }
        }
        if (this.password !== this.confirm_password)
          this.passwordError = true
        else {
          axios.post('http://127.0.0.1:8000/api/v1/users/', {
            'username': this.username,
            'email': this.email,
            'password': this.password,
            'isActive': true
          }).then(() => {
            this.$router.push({name: 'home'});
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.to_login {
  text-align: center;
  color: #FFFFFF;
}

.title {
  color: #FFFFFF;
  background: linear-gradient(180deg, rgba(8, 135, 120, 0.1) 0%, rgba(0, 238, 200, 0.1) 100%);
  border-radius: 100px;
  text-align: center;
  height: 100%;
}

.input_group {
  height: 70px;
  display: flex;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
}

.input:hover {
  filter: brightness(80%);
}


.input {
  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  margin: 0 50px 0 20px;
  width: 100%;
  -webkit-appearance: none;
  background: none;
}


.login_to {
  width: 50%;
  height: 70px;
  color: #FFFFFF;
  font-size: 20px;
  background: #4CAF50;
  border-radius: 90px;
}

.login_to:hover {
  filter: brightness(80%);
}

.input:focus {
  border-bottom: 1px solid white;
}


::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}


.register_page {
  display: grid;
  padding: 20px 300px;
  grid-template-rows: 1fr 7fr;
  gap: 20px;
  background: linear-gradient(63.18deg, #00EEC8 0%, rgba(42, 135, 120, 0.9) 47.92%, #0F7B6A 83.33%);
}

</style>