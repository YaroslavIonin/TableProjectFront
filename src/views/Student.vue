<template>
  <!--    <p>Привет, я студент {{ student.name_ru }}</p>-->
  <!--    <table class="table">-->
  <!--      <tr>-->
  <!--        <td>{{ student.name_en }}</td>-->
  <!--      </tr>-->
  <!--      <tr>-->
  <!--        <td>{{ student.country }}</td>-->
  <!--      </tr>-->
  <!--      <tr>-->
  <!--        <td>{{ student.number_doc }}</td>-->
  <!--      </tr>-->
  <!--      <tr>-->
  <!--        <td v-if="student.gender===2">Мужской</td>-->
  <!--        <td v-else>Женский</td>-->
  <!--      </tr>-->
  <!--    </table>-->
  <div class="add__student__wrapper">
    <div class="wrapper_item" style="border-radius:20px 0  0 0;">
      <div>
        <img src="../assets/return.svg" @click="goToHome" class="goHome" alt="return-ico"
             style="width:35px;text-align: center; height: 35px;">
      </div>
    </div>
    <div class="wrapper_item" style="border-radius:  0  20px 0 0;">
      <h2 style="margin: 0 auto; max-width: 500px">КартОчка студента</h2>
    </div>
    <div class="wrapper_item"><label for="name_ru">ФИО на русском</label></div>
    <div class="wrapper_item">{{ student.name_ru }}</div>
    <div class="wrapper_item"><label class="labels__wrapper__item" for="name_en">ФИО на английском</label></div>
    <div class="wrapper_item">{{ student.name_en }}</div>
    <div class="wrapper_item"><label class="labels__wrapper__item">Дата рождения</label></div>
    <div class="wrapper_item">{{ student.date_birth }}</div>
    <div class="wrapper_item"><label class="labels__wrapper__item" for="gender">Пол</label></div>

    <div v-if="student.gender===2" class="wrapper_item">Мужской</div>
    <div v-else class="wrapper_item">Женский</div>


    <div class="wrapper_item"><label class="labels__wrapper__item">Страна</label></div>
    <div class="wrapper_item">{{ student.country }}</div>
    <div class="wrapper_item"><label class="labels__wrapper__item">Номер документа</label></div>
    <div class="wrapper_item">{{ student.number_doc }}</div>
    <div class="wrapper_item"><label class="labels__wrapper__item">Факт зачисления</label></div>
    <div class="wrapper_item" style="display: inline-flex">
      <img v-if="student.is_enrolled" src="../assets/check.svg">
      <img v-else src="../assets/x.svg">
    </div>
    <div class="wrapper_item"><label class="labels__wrapper__item">Находится в
      РФ</label></div>
    <div class="wrapper_item" style="display: inline-flex;">
      <img v-if="student.in_Rus" src="../assets/check.svg">
      <img v-else src="../assets/x.svg">
    </div>
    <div class="wrapper_item" style="border-radius: 0  0 0 20px;"></div>
    <div class="wrapper_item filter-footer1" style="border-radius: 0  0 20px 0;">
      <button class="btn btn-danger btn-lg" style="width: 250px" v-on:click="showModal">Удалить студента</button>
      <button class="btn btn-info btn-lg" style="width: 300px" v-on:click="goToUpdate">Изменить даннные студента</button>
    </div>

  </div>
<modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <h5 style="margin: auto 0 ">Предупреждение</h5>
      <button class="close" @click="closeModal">
        <img src="../assets/Vector.svg">
      </button>
    </template>
    <template v-slot:body>
      <h3>Вы уверены, что хотите удалить студента?</h3>
    </template>
    <template v-slot:footer>
      <button type="button" style="margin: 0 auto 0 0" class="btn btn-warning" @click="closeModal" aria-label="Close modal">
          Нет, отмена
      </button>
      <button type="button" style="margin: 0 0 0 auto" class="btn btn-danger" @click="deleteStudent" aria-label="Close modal">
          Да, удалить
      </button>
    </template>
  </modal>

</template>

<script>
import axios from "axios";
import modal from "@/components/modal";

export default {
  name: 'Student',
  props: ['id'],
  data() {
    return {
      isModalVisible: false,
      student: {}
    }
  },
  components:{
    modal
  },
  created() {
    this.loadStudent()
  },
  methods: {
    async loadStudent() {
      this.student = await fetch(
          `http://127.0.0.1:8000/api/v1/students/${this.id}`
      ).then(response => response.json())
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
    async deleteStudent() {
      await axios.delete(`http://127.0.0.1:8000/api/v1/students/${this.id}`)
          .then(() => {
            alert('Студент успешно удалён (из жизни)')
            this.$router.push({name: 'home'})
          })
    },
    goToUpdate() {
      this.$router.push({name: 'UpdateStudent', params: {id: this.id}})
    },
    goToHome() {
      this.$router.push({name: 'home'})
    },
  }

}
</script>

<style scoped>

</style>