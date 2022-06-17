<template>
  <div class="login_page">
    <div style="padding: 15px">
      <div class="title">
        <h3 style="padding-top: 10px;">
          Учет контингента слушателей<br>подготовительного отделения УрФУ
        </h3>
      </div>
    </div>
    <form v-on:submit.prevent="login">
      <div style="padding: 15px">
        <h5 style="color: red" v-show="usernameError">Пользователь с таким именем не существует</h5>
        <div class="input_group">
          <img width="33" src="../assets/user.svg">
          <input class="input" v-model="username" type="text" placeholder="Имя пользователя" required>
        </div>
      </div>
      <div style="padding: 15px">
        <h5 style="color: red" v-show="passwordError">Неверный пароль</h5>
        <div class="input_group">
          <img width="33" src="../assets/pswrd.svg">
          <input class="input" v-model="password" type="password" placeholder="Пароль" required>
        </div>
      </div>
      <div style="text-align: center;">
        <button class="btn login_to" type="submit">Войти</button><br><br><br>
        <a href="#" class="to_signin" v-on:click="this.$router.push({name: 'SignIn'})">Зарегистрироваться</a>

      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      passwordError: false,
      usernameError: false,
      users: [],
      user: {},
      username: '',
      password: '',
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
    async login() {
      this.passwordError = false
      this.usernameError = false
      await this.getUsers().then(() => {
        for (let user of this.users) {
          if ((user.username === this.username) || (user.email === this.username)) {
            if (user.password === this.password) {
              this.doIsActive(user)
              return
            } else {
              this.passwordError = true
              return
            }
          }
        }
        this.usernameError = true
      })

    },
    doIsActive(user) {
      axios.put(`http://127.0.0.1:8000/api/v1/users/${user.id}/`, {
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "isActive": true,
      })
      this.goToHome()
    },
    goToHome() {
      this.$router.push({name: 'home'});
    },
  }
}
</script>

<style scoped>
.title {
  color: #FFFFFF;
  background: linear-gradient(180deg, rgba(8, 135, 120, 0.1) 0%, rgba(0, 238, 200, 0.1) 100%);
  border-radius: 100px;
  text-align: center;
  height: 100%;
}

.to_signin {

  text-align: center;
  color: #FFFFFF;
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


::-webkit-input-placeholder { /* WebKit browsers */
  color: rgba(255, 255, 255, 0.8);
}


.login_page {
  display: grid;
  padding: 20px 300px;
  grid-template-rows: 1fr 3fr;
  height: 100vh;
  gap: 50px;
  background: linear-gradient(63.18deg, #00EEC8 0%, rgba(42, 135, 120, 0.9) 47.92%, #0F7B6A 83.33%);
}


</style>