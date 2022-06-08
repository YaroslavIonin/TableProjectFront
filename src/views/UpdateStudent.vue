<template>
  <!--  <form v-on:submit.prevent="onSubmit"  style="margin: 50px auto; max-width: 500px">-->
  <!--    <div class="form-group" >-->
  <!--      <label for="name_ru">Имя на русском языке</label>-->
  <!--      <input type="text" v-model="put.name_ru" class="form-control" placeholder="Введите ФИО" id="name_ru" required>-->
  <!--    </div>-->
  <!--    <div class="form-group">-->
  <!--      <label for="name_en">Имя на английском языке</label>-->
  <!--      <input type="text" v-model="put.name_en" class="form-control" required placeholder="Введите ФИО на английском" id="name_en">-->
  <!--    </div>-->
  <!--    <div class="form-group">-->
  <!--      <label for="gender">Пол</label>-->
  <!--      <select v-model="put.gender"  class="form-control" id="gender" required>-->
  <!--        <option>Мужской</option>-->
  <!--        <option>Женский</option>-->
  <!--      </select>-->
  <!--    </div>-->
  <!--    <div class="form-group">-->
  <!--      <label for="country">Страна</label>-->
  <!--      <input type="text" v-model="put.country" class="form-control" placeholder="Введите страну" id="country" required>-->
  <!--    </div>-->
  <!--    <div class="form-group">-->
  <!--      <label for="number_doc">Номер документа</label>-->
  <!--      <input type="number" v-model.number="put.number_doc" class="form-control" placeholder="Номер документа" id="number_doc" required>-->
  <!--    </div>-->
  <form v-on:submit.prevent="isModalVisible = !isModalVisible">
    <div class="add__student__wrapper">
      <div class="wrapper_item" style="border-radius:20px 0  0 0;">
        <div>
          <img src="../assets/return.svg" @click="goToStudent" class="goHome" alt="return-ico"
               style="width:35px;text-align: center ;height: 35px;">
        </div>
      </div>
      <div class="wrapper_item" style="border-radius:  0  20px 0 0;">
        <h2 style="margin: 0 auto; max-width: 500px">Изменение данных студента</h2>
      </div>
      <div class="wrapper_item"><label for="name_ru">ФИО на русском</label></div>
      <div class="wrapper_item"><input required v-model="put.name_ru" id="name_ru"
                                       class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите ФИО на русском"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item" for="name_en">ФИО на английском</label></div>
      <div class="wrapper_item"><input required v-model="put.name_en" id="name_en"
                                       class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите ФИО на английском"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Дата рождения</label></div>
      <div class="wrapper_item"><input v-model="put.date_birth" required style="max-width: 20%;"
                                       class="form-control inputs__wrapper__item" type="date"
                                       placeholder="YYYY.MM.DD"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item" for="gender">Пол</label></div>
      <div class="wrapper_item">
        <select required v-model="put.gender" class="form-control labels__wrapper__item" id="gender"
                style="padding: 5px;max-width: 20%;">
          <option>Мужской</option>
          <option>Женский</option>
        </select>
      </div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Страна</label></div>
      <div class="wrapper_item"><input required v-model="put.country" class="form-control inputs__wrapper__item"
                                       type="text"
                                       placeholder="Введите название страны"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Номер документа</label></div>
      <div class="wrapper_item"><input v-model.number="put.number_doc" class="form-control inputs__wrapper__item"
                                       type="number"
                                       placeholder="Введите номер документа"></div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Зачислен</label></div>
      <div class="wrapper_item" style="display: inline-flex">
        <input id="LearnStatus_yes" v-model.number="put.is_enrolled" style="margin-right: 5px"
               name="LearnStatus"
               type="radio" value=1>
        <label for="LearnStatus_yes" style="margin-right: 20px">Да</label>
        <input id="LearnStatus_no" v-model="put.is_enrolled" name="LearnStatus" style="margin-right: 5px"
               type="radio" value=0>
        <label for="LearnStatus_no" style="margin-right: 20px">Нет</label>
      </div>
      <div class="wrapper_item"><label class="labels__wrapper__item">Находится в
        РФ</label></div>
      <div class="wrapper_item" style="display: inline-flex;">
        <div>
          <input id="IsInRf_yes" v-model="put.in_Rus" style="margin-right: 5px" name="IsInRf" type="radio" value=true>
          <label for="IsInRf_yes" style="margin-right: 20px">Да</label>
        </div>
        <div>
          <input id="IsInRf_no" name="IsInRf" v-model="put.in_Rus" style="margin-right: 5px" type="radio" value=false>
          <label for="IsInRf_no" style="margin-right: 20px">Нет</label>
        </div>
      </div>
      <div class="wrapper_item" style="border-radius: 0  0 0 20px;"></div>
      <div class="wrapper_item" style="text-align: center; border-radius: 0  0 20px 0;">
        <button class="btn btn-lg btn-info" type="submit">Сохранить изменения</button>
      </div>
    </div>
  </form>
  <modal v-show="isModalVisible" @close="closeX">
    <template v-slot:header>
      <h4 style="margin: auto 0 ">Предупреждение:</h4>
      <button class="close" @click="closeX">
        <img src="../assets/Vector.svg">
      </button>
    </template>
    <template v-slot:body>
      <h4>Вы уверены, что хотите изменить данные студента?</h4>
    </template>
    <template v-slot:footer>
      <button type="button" style="margin: 0 auto 0 0" class="btn btn-danger" @click="closeX" aria-label="Close modal">
        Отмена
      </button>
      <button type="button" style="margin: 0 0 0 auto" class="btn btn-info" @click="onSubmit" aria-label="Close modal">
        Сохранить изменения
      </button>
    </template>
  </modal>
</template>

<script>


import axios from "axios";
import Modal from "@/components/modal";

export default {
  name: "UpdateStudent",
  components: {Modal},
  props: ['id'],
  data() {
    return {
      isModalVisible: false,
      put: {}
    }
  },
  created() {
    this.loadStudent()
  },
  methods: {
    async loadStudent() {
      this.put = await fetch(
          `http://127.0.0.1:8000/api/v1/students/${this.id}`
      ).then(response => response.json())
    },
    closeX() {
      this.isModalVisible = false;
    },
    onSubmit() {
      if (this.put.gender === 'Женский')
        this.put.gender = 1
      else this.put.gender = 2
      axios.put(`http://127.0.0.1:8000/api/v1/students/${this.id}/`, {
        "name_ru": this.put.name_ru,
        "name_en": this.put.name_en,
        "country": this.put.country,
        "number_doc": this.put.number_doc,
        "gender": this.put.gender,
        "user": this.put.user,
        "date_birth": this.put.date_birth,
        "is_enrolled": this.put.is_enrolled,
        "in_Rus": this.put.in_Rus,
      })
      alert('Изменения сохранены !!!')
      this.goToStudent()
    },
    goToStudent() {
      this.$router.push({name: 'Student', params: {id: this.id}})
    }
  }

}
</script>

<style scoped>

</style>