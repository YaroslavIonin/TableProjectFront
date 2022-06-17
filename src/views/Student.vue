<template>
  <header style="background-color: rgba(0, 76, 64, 1); height: 50px; padding: 5px ">
    <div class="goHome">
      <img src="../assets/exit.svg" width="40" height="40" @click="goToHome"  alt="return-ico">
    </div>
  </header>
  <main style="background-color: rgba(0, 121, 107, 1); max-height: 100%; padding: 30px 30px">
    <div class="data-student">
      <div
          style="font-size: 24px; color: white;padding: 10px; grid-column-start: 1; grid-column-end: 3; background-color: rgba(8, 127, 35, 1)">
        Карточка студента
      </div>
      <div class="data_0"><label>ФИО на русском</label></div>
      <div class="data_1">{{ student.name_ru }}</div>

      <div class="data_0"><label class="">ФИО на английском</label></div>
      <div class="data_1">{{ student.name_en }}</div>

      <div class="data_0"><label class="">Дата рождения</label></div>
      <div class="data_1">{{ student.date_birth }}</div>

      <div class="data_0"><label class="">Пол</label></div>
      <div v-if="student.gender===2" class="data_1">Мужской</div>
      <div v-else class="data_1">Женский</div>

      <div class="data_0"><label class="">Страна</label></div>
      <div class="data_1">{{ student.country }}</div>

      <div class="data_0"><label class="">Номер документа</label></div>
      <div class="data_1">{{ student.number_doc }}</div>

      <div class="data_0"><label class="">Факт зачисления</label></div>
      <div class="data_1">
        <img v-if="student.is_enrolled" src="../assets/check.svg">
        <img v-else src="../assets/x.svg">
      </div>

      <div class="data_0"><label class="">Находится в РФ</label></div>
      <div class="data_1">
        <img v-if="student.in_Rus" src="../assets/check.svg">
        <img v-else src="../assets/x.svg">
      </div>
    </div>
    <div>
      <button class="btn-put" v-on:click="goToUpdate">
        <img src="../assets/icon.svg">
      </button>
      <button class="btn-delete" v-on:click="showModal">
        <img src="../assets/delete.svg">
      </button>
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
        <button type="button" style="margin: 0 auto 0 0" class="btn btn-warning" @click="closeModal"
                aria-label="Close modal">
          Нет, отмена
        </button>
        <button type="button" style="margin: 0 0 0 auto" class="btn btn-danger" @click="deleteStudent"
                aria-label="Close modal">
          Да, удалить
        </button>
      </template>
    </modal>

  </main>
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
  components: {
    modal
  },
  created() {
    this.loadStudent()
    scroll(0,0)
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

.btn-put {
  position: fixed;
  right: 50px;
  bottom: 0;
  margin: 0 20px 30px 0;
  width: 80px;
  height: 80px;
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 80px;
  background-color: rgba(8, 127, 35, 1);
  border: none;
}

.btn-delete {
  left: 50px;
  bottom: 0;
  margin: 20px 0 0 20px;
  width: 80px;
  height: 80px;
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 80px;
  background-color: rgba(204, 0, 0, 1);
  border: none;
}

.btn-delete:hover, .btn-put:hover, .goHome:hover{
  filter: brightness(150%);
  cursor: pointer;
}


.data-student {
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.35), 0 5px 5px 3px rgba(0, 0, 0, 0.3);
}

.data_0 {
  background-color: white;
  font-size: 18px;
  border-bottom: 1px solid rgba(8, 127, 35, 1);
  padding: 15px;
  vertical-align: middle;

}

div.data_0 > label {
  margin: 3px 5px;

}


.data_1 {
  padding: 15px;
  font-size: 18px;
  border-bottom: 1px solid rgba(8, 127, 35, 1);
  background-color: white;
}

.goHome{
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: rgba(0, 76, 64, 1);
  margin-left: 25px;
}



</style>