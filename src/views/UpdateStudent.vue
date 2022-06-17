<template>
  <header style="background-color: rgba(0, 76, 64, 1); height: 50px; padding: 5px ">
    <div class="goHome">
      <img src="../assets/exit.svg" width="40" height="40" @click="isModalVisible1 = !isModalVisible1" alt="return-ico">
    </div>
    <modal v-show="isModalVisible1" @close="closeX1">
      <template v-slot:header>
        <h4 style="margin: auto 0 ">Предупреждение:</h4>
        <button class="close" @click="closeX1">
          <img src="../assets/Vector.svg">
        </button>
      </template>
      <template v-slot:body>
        <h4>Вы не сохранили изменения</h4>
      </template>
      <template v-slot:footer>
        <button type="button" style="margin: 0 auto 0 0" class="btn-no" @click="closeX1">
          Отмена
        </button>
        <button type="button" class="btn-save" style="width: 200px" @click="goToStudent">
          Выйти, без сохранения
        </button>
      </template>
    </modal>
  </header>
  <main style="background-color: rgba(0, 121, 107, 1); max-height: 100%; padding: 30px 30px">
    <form v-on:submit.prevent="isModalVisible = !isModalVisible" class="data-student">
      <div
          style="font-size: 24px; color: white;padding: 10px; grid-column-start: 1; grid-column-end: 3; background-color: rgba(8, 127, 35, 1)">
        Изменение данных студента
      </div>
      <div class="data_0"><label for="name_ru">ФИО на русском</label></div>
      <div class="data_1">
        <input required v-model="put.name_ru" id="name_ru"
               class="form-control"
               type="text"
               placeholder="Введите ФИО на русском">
      </div>

      <div class="data_0"><label for="name_en">ФИО на английском</label></div>
      <div class="data_1">
        <input required v-model="put.name_en" id="name_en"
               class="form-control"
               type="text"
               placeholder="Введите ФИО на английском"></div>

      <div class="data_0"><label for="date_birth">Дата рождения</label></div>
      <div class="data_1">
        <input v-model="put.date_birth" id="date_birth" required style="max-width: 30%;"
               class="form-control" type="date"
               placeholder="YYYY.MM.DD">
      </div>

      <div class="data_0"><label for="gender">Пол</label></div>
      <div class="data_1">
        <select required v-model="put.gender" class="form-control" id="gender"
                style="padding: 5px;max-width: 30%;">
          <option>Мужской</option>
          <option>Женский</option>
        </select>
      </div>

      <div class="data_0"><label for="country">Страна</label></div>
      <div class="data_1">
        <input required v-model="put.country" id="country" class="form-control"
               type="text"
               placeholder="Введите название страны">
      </div>

      <div class="data_0"><label for="num_doc">Номер документа</label></div>
      <div class="data_1">
        <input required id="num_doc" v-model.number="put.number_doc" class="form-control"
               type="number"
               placeholder="Введите номер документа">
      </div>

      <div class="data_0"><label class="">Факт зачисления</label></div>
      <div class="data_1">
        <input required id="LearnStatus_yes" v-model.number="put.is_enrolled" style="margin-right: 5px"
               name="LearnStatus"
               type="radio" value=true>
        <label for="LearnStatus_yes" style="margin-right: 20px">Да</label>
        <input required id="LearnStatus_no" v-model="put.is_enrolled" name="LearnStatus" style="margin-right: 5px"
               type="radio" value=false>
        <label for="LearnStatus_no" style="margin-right: 20px">Нет</label>
      </div>

      <div class="data_0"><label class="">Находится в РФ</label></div>
      <div class="data_1">
        <input required id="IsInRf_yes" v-model="put.in_Rus" style="margin-right: 5px" name="IsInRf" type="radio"
               value=true>
        <label for="IsInRf_yes" style="margin-right: 20px">Да</label>
        <input required id="IsInRf_no" name="IsInRf" v-model="put.in_Rus" style="margin-right: 5px" type="radio"
               value=false>
        <label for="IsInRf_no" style="margin-right: 20px">Нет</label>
      </div>
    </form>
    <button class="btn-put" v-on:click="isModalVisible = !isModalVisible">
      <img src="../assets/save.svg">
    </button>
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
        <button type="button" style="margin: 0 auto 0 0" class="btn-no" @click="closeX"
                aria-label="Close modal">
          Отмена
        </button>
        <button type="button" class="btn-save" @click="onSubmit"
                aria-label="Close modal">
          Сохранить изменения
        </button>
      </template>
    </modal>
  </main>
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
      isModalVisible1: false,
      put: {}
    }
  },
  created() {
    this.loadStudent()
    scroll(0, 0)
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
    closeX1() {
      this.isModalVisible1 = false;
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


.btn-no {
  color: white;
  border: none;
  border-radius: 5px;
  width: 80px;
  padding: 5px;
  background-color: rgba(204, 0, 0, 1);
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3);
}

.btn-save {
  margin: 0 0 0 auto;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  width: 180px;
  background-color: rgba(8, 127, 35, 1);
  box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3);
}

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

.btn-no:hover, .btn-put:hover, .btn-save:hover, .goHome:hover {
  filter: brightness(120%);
  cursor: pointer;
}


.data-student {
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.35), 0 5px 5px 3px rgba(0, 0, 0, 0.3);
}

div.data_0 > label {
  margin: 8px 10px;

}

.data_0 {
  background-color: white;
  font-size: 18px;
  vertical-align: middle;
  border-bottom: 1px solid rgba(8, 127, 35, 1);
  padding: 10px;
}

.data_1 {
  padding: 10px;
  vertical-align: middle;
  font-size: 18px;
  border-bottom: 1px solid rgba(8, 127, 35, 1);
  background-color: white;
}

.goHome {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: rgba(0, 76, 64, 1);
  margin-left: 25px;
}

</style>