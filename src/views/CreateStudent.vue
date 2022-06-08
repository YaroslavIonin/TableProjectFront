<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="add__student__wrapper">
      <div class="wrapper_item" style="border-radius:20px 0  0 0;">
        <div>
          <img src="../assets/return.svg" @click="goToHome" class="goHome" alt="return-ico"
               style="width:35px;text-align: center ;height: 35px;">
        </div>
      </div>
      <div class="wrapper_item" style="border-radius:  0  20px 0 0;">
        <h2 style="margin: 0 auto; max-width: 500px">Заполните данные студента</h2>
      </div>
      <div class="wrapper_item"><label for="name_ru">ФИО на русском</label></div>
      <div class="wrapper_item"><input required v-model="post.name_ru" id="name_ru"
                                       class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите ФИО на русском"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item" for="name_en">ФИО на английском</label></div>
      <div class="wrapper_item"><input required v-model="post.name_en" id="name_en"
                                       class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите ФИО на английском"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Дата рождения</label></div>
      <div class="wrapper_item"><input v-model="post.date_birth" required style="max-width: 20%;"
                                       class="form-control inputs__wrapper__item" type="date"
                                       placeholder="YYYY.MM.DD"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item" for="gender">Пол</label></div>
      <div class="wrapper_item">
        <select required v-model="post.gender" class="form-control labels__wrapper__item" id="gender"
                style="padding: 5px;max-width: 20%;">
          <option>Мужской</option>
          <option>Женский</option>
        </select>
      </div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Страна</label></div>
      <div class="wrapper_item"><input required v-model="post.country" class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите название страны"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Номер документа</label></div>
      <div class="wrapper_item"><input v-model.number="post.number_doc" class="form-control inputs__wrapper__item"
                                       type="number"
                                       placeholder="Введите номер документа"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Зачислен</label></div>
      <div class="wrapper_item" style="display: inline-flex">
        <input required id="LearnStatus_yes" v-model.number="post.is_enrolled" style="margin-right: 5px"
               name="LearnStatus"
               type="radio" value=1>
        <label for="LearnStatus_yes" style="margin-right: 20px">Да</label>
        <input required id="LearnStatus_no" v-model="post.is_enrolled" name="LearnStatus" style="margin-right: 5px"
               type="radio" value=0>
        <label for="LearnStatus_no" style="margin-right: 20px">Нет</label>
      </div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Находится в
        РФ</label></div>
      <div class="wrapper_item" style="display: inline-flex;">
        <div>
          <input id="IsInRf_yes" v-model="post.in_Rus" style="margin-right: 5px" name="IsInRf" type="radio" value=true>
          <label for="IsInRf_yes" style="margin-right: 20px">Да</label>
        </div>
        <div>
          <input id="IsInRf_no" name="IsInRf" v-model="post.in_Rus" style="margin-right: 5px" type="radio" value=false>
          <label for="IsInRf_no" style="margin-right: 20px">Нет</label>
        </div>
      </div>
      <div class="wrapper_item" style="border-radius: 0  0 0 20px;"></div>
      <div class="wrapper_item" style="text-align: center; border-radius: 0  0 20px 0;">
        <button class="btn btn-lg btn-success" style="" type="submit">Добавить студента</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateStudent",
  data() {
    return {
      post: {
        name_ru: '',
        name_en: '',
        gender: '',
        country: '',
        number_doc: '',
        user: 1,
        in_Rus: '',
        is_enrolled: '',
        date_birth: '',
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.post.gender === 'Женский')
        this.post.gender = 1
      else this.post.gender = 2
      axios.post('http://127.0.0.1:8000/api/v1/students/', {
        "name_ru": this.post.name_ru,
        "name_en": this.post.name_en,
        "country": this.post.country,
        "number_doc": this.post.number_doc,
        "gender": this.post.gender,
        "user": this.post.user,
        "date_birth": this.post.date_birth,
        "is_enrolled": this.post.is_enrolled,
        "in_Rus": this.post.in_Rus,
      })
      alert('Студент добавлен!!!')
      this.goToHome()
    },
    goToHome() {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style >
.add__student__wrapper {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-weight: 400;
  font-size: 24px;
  font-style: normal;
}

.goHome:hover {
  background-color: #c7ab7f;
  border-radius: 5px;
  cursor: pointer;
}

.wrapper_item {
  padding: 15px 20px;
  width: 100%;
}

.wrapper_item:nth-of-type(odd) {
  background-color: #F4E4CC;
}

.wrapper_item:nth-of-type(even) {
  background-color: #E2E2E2;
}

.inputs__wrapper__item {
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border: 1px solid #A7A7AA;
  border-radius: 5px;
  padding-left: 10px;
}
</style>