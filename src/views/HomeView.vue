<template>
  <div>
    <div class="wrapper" style="background: #00796B">
      <img class="btn showNav" @click.prevent="sidebarShow = !sidebarShow" type="button"
           data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
           aria-controls="offcanvasWithBothOptions" src="../assets/menu.svg" alt="filter">

      <Nav v-show="sidebarShow">
        <template v-slot:header>
          <div class="header">
            <div style="color: #FFFFFF">
              {{ user.username }}<br>
              {{ user.email }}
            </div>
            <img style="margin-left: auto" src="../assets/exit.svg" width="30" height="30" class="back"
                 @click.prevent="sidebarShow = !sidebarShow">
            <button class="logout" v-on:click="doIsNotActive">Выйти из аккаунта</button>
          </div>
        </template>
        <template v-slot:body>
          <div class="section_nav">
            <div style="display: flex; padding: 5px; vertical-align: middle">
              <img width="25" style="margin-left: 10px" src="../assets/table.svg">
              <h5 style="text-align: center; width: 100%">Таблицы</h5>
            </div>
            <div>
              <button class="btn_nav">
                <img src="../assets/btn.svg" style="margin-right: 5px">
                Подгот. год
              </button>
              <button class="btn_nav">
                <img src="../assets/btn.svg" style="margin-right: 5px">
                Курсы РЯ
              </button>
              <button class="btn_nav">
                <img src="../assets/btn.svg" style="margin-right: 5px">
                Подгот. 1.5 год
              </button>
              <button class="btn_nav">
                <img src="../assets/btn.svg" style="margin-right: 5px">
                Квотники
              </button>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="footer">
            <img width="180" height="120" src="../assets/logo.svg">
          </div>
        </template>
      </Nav>

      <modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          <h5 style="margin: auto 0 ">Фильтры</h5>
          <button class="close" @click="closeX">
            <img src="../assets/Vector.svg">
          </button>
        </template>
        <template v-slot:body>
          <form>
            <div class="form-group">
              <label for="filter-country">Страна</label>
              <input type="text" v-model="filterCountry" class="form-control" id="filter-country">
            </div>
            <div class="form-group">
              <label for="filter_gender">Пол</label>
              <select v-model.number="filterGender" class="form-control" name="gender" id="filter_gender">
                <option class="option-1" value=2>Мужской</option>
                <option class="option-1" value=1>Женский</option>
              </select>
            </div>
            <label class="form-check-label" for="is_enrolled">Факт зачисления</label>
            <div id="is_enrolled">
              <div class="form-check">
                <input type="radio" v-model="filter_is_enrolled" value=true name="enrolled" class="form-check-input"
                       id="is_yes_enrolled">
                <label class="form-check-label" for="is_yes_enrolled">Да</label>
              </div>
              <div class="form-check">
                <input type="radio" v-model="filter_is_enrolled" value=false name="enrolled" class="form-check-input"
                       id="is_no_enrolled">
                <label class="form-check-label" for="is_no_enrolled">Нет</label>
              </div>
            </div>
            <label class="form-check-label" for="in_Rus">Факт нахождения в России</label>
            <div id="in_Rus">
              <div class="form-check">
                <input type="radio" name="in_Rus" v-model="filter_in_Rus" value=true class="form-check-input"
                       id="in_yes_Rus">
                <label class="form-check-label" for="in_yes_Rus">Да</label>
              </div>
              <div class="form-check">
                <input type="radio" name="in_Rus" v-model="filter_in_Rus" value=false class="form-check-input"
                       id="is_no_Rus">
                <label class="form-check-label" for="is_no_Rus">Нет</label>
              </div>
            </div>
          </form>
        </template>
        <template v-slot:footer>
          <small class="form-text text-muted">Проверьте введённые данные и примените фильтр:</small>
          <button type="button" class="btn-green" @click="close" aria-label="Close modal">
            Применить
          </button>
        </template>
      </modal>
      <input class="wrapper__item search__item" v-model="search" placeholder="Найти студента..."
             type="search"
             id="student-search"
             name="student-search">
      <img class="btn filer" type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
           aria-expanded="false" src="../assets/filter.svg" alt="filter" @click="showModal">
      <button class="wrapper__item add__item btn" @click="isModalVisible1 = !isModalVisible1; " style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            padding: 0;
                            background: rgba(8, 127, 35, 1);
                            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
                            border-radius: 10px;
                            color: white;
                            ;
                       ">
        <svg style="margin-left: 10px" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
             class="bi bi-person-plus"
             viewBox="0 0 16 16">
          <path
              d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          <path fill-rule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <div style="margin-left: 20px; ">Добавить студента</div>
      </button>
      <div style="background-color: rgba(0, 0, 0, 0.3);">
        <modal class="add_student" v-show="isModalVisible1" @close="closeModal1">
          <template v-slot:header>
            <h4 style="margin: auto 0 ">Добавление студента</h4>
            <button class="close" @click="closeModal1">
              <img src="../assets/Vector.svg">
            </button>
          </template>
          <template v-slot:body>
            <form v-on:submit.prevent="onSubmit">
              <div class="form-group">
                <label class='form-check-label' for="name_ru">ФИО на русском</label>
                <input required v-model="post.name_ru" id="name_ru"
                       class="form-control"
                       type="text"
                       placeholder="Введите ФИО на русском">
              </div>
              <div class="form-group">
                <label class="form-check-label" for="name_en">ФИО на английском</label>
                <input required v-model="post.name_en" id="name_en"
                       class="form-control"
                       type="text"
                       placeholder="Введите ФИО на английском">
              </div>
              <div class="form-group">
                <label class="form-check-label" for="date_birth">Дата рождения</label>
                <input v-model="post.date_birth" required style="max-width: 50%;"
                       class="form-control" type="date" id="date_birth"
                       placeholder="YYYY.MM.DD">
              </div>
              <div class="form-group">
                <label class="form-check-label" for="gender">Пол</label>
                <select required v-model="post.gender" class="form-control" id="gender"
                        style="padding: 5px;max-width: 50%;">
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-check-label" for="country">Страна</label>
                <input required v-model="post.country" class="form-control" id="country"
                       type="text"
                       placeholder="Введите название страны">
              </div>
              <div class="form-group">
                <label class="form-check-label" for="num_doc">Номер документа</label>
                <input v-model.number="post.number_doc" class="form-control " id="num_doc"
                       type="number"
                       placeholder="Введите номер документа" required>
              </div>
              <div class="form-group">
                <label class="form-check-label">Зачислен:</label>
                <div style="display: flex; padding: 5px">
                  <input id="LearnStatus_yes" v-model.number="post.is_enrolled" style="margin-right: 5px"
                         name="LearnStatus" class="form-check"
                         type="radio" value=true required>
                  <label class="" for="LearnStatus_yes" style="margin-right: 20px">Да</label>
                  <input id="LearnStatus_no" v-model="post.is_enrolled" name="LearnStatus"
                         style="margin-right: 5px" class="form-check"
                         type="radio" value=false required>
                  <label class="" for="LearnStatus_no" style="margin-right: 20px">Нет</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-check-label">Находится в РФ:</label>
                <div style="display: flex; padding: 5px">
                  <input required id="IsInRf_yes" v-model="post.in_Rus" style="margin-right: 5px" name="IsInRf"
                         type="radio"
                         value=true class="form-check">
                  <label class="form-check-label" for="IsInRf_yes" style="margin-right: 20px">Да</label>
                  <input required id="IsInRf_no" name="IsInRf" v-model="post.in_Rus" style="margin-right: 5px"
                         type="radio"
                         value=false class="form-check">
                  <label class="form-check-label" for="IsInRf_no" style="margin-right: 20px">Нет</label>
                </div>
              </div>
              <div style="display: flex">
                <small style="margin-right: 10px;" class="form-text text-muted">Проверьте введённые данные<br>и добавьте
                  студента:</small>
                <button class="btn btn-lg btn-success" style="margin: auto" type="submit">Добавить студента</button>
              </div>
            </form>
          </template>
          <template v-slot:footer></template>
        </modal>
      </div>
    </div>
    <div class="home">
      <h3 style="margin-top: 70px">Контрактники</h3>
      <table class="table table-bordered table-responsive-sm table-striped table-hover">
        <thead>
        <tr>
          <th class="column" scope="col">Фио на русском</th>
          <th class="column" scope="col">Фио на английском</th>
          <th class="column" scope="col">Дата рождения</th>
          <th class="column" scope="col">Пол</th>
          <th class="column" scope="col">Страна</th>
          <th class="column" scope="col">Номер документа</th>
          <th class="column" scope="col">Факт зачисления</th>
          <th class="column" scope="col">Факт нахождения в России</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in searchHandler" @click="goTo(student.id)" style="cursor: pointer">
          <td class="column-2">{{ student.name_ru }}</td>
          <td class="column-2">{{ student.name_en }}</td>
          <td class="column-1">{{ student.date_birth }}</td>
          <td class="column-1" v-if="student.gender===1">Жен</td>
          <td class="column-1" v-else>Муж</td>
          <td class="column-1">{{ student.country }}</td>
          <td class="column-1">{{ student.number_doc }}</td>
          <td class="column-1" v-if="student.is_enrolled"><img src="../assets/check.svg"></td>
          <td class="column-1" v-else><img src="../assets/x.svg"></td>
          <td class="column-1" v-if="student.in_Rus"><img src="../assets/check.svg"></td>
          <td class="column-1" v-else><img src="../assets/x.svg"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>

import Modal from "@/components/modal";
import student from "@/views/Student";
import axios from "axios";
import Nav from "@/components/Nav";

export default {
  name: 'HomeView',
  data() {
    return {
      user: '',
      isModalVisible: false,
      search: '',
      filter_in_Rus: '',
      filter_is_enrolled: '',
      filterGender: 0,
      filterCountry: '',
      isModalVisible1: false,
      listStudents: [],
      listStudentsCopy: [],
      sidebarShow: false,
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
  components: {Nav, Modal},
  created() {
    this.getUserActive().then(() => {
          if (this.user.isActive === true) {
            console.log(this.user)
            this.loadListStudents()
          } else this.$router.push({name: 'LogIn'})
        }
    )
  },
  methods: {
    async loadListStudents() {
      this.listStudents = await fetch(
          "http://127.0.0.1:8000/api/v1/students/"
      ).then(response => response.json())
      this.listStudentsCopy = this.listStudents
    },
    doIsNotActive() {
      axios.put(`http://127.0.0.1:8000/api/v1/users/${this.user.id}/`, {
        "id": this.user.id,
        "username": this.user.username,
        "password": this.user.password,
        "email": this.user.email,
        "isActive": false,
      })
      this.$router.push({name: 'LogIn'})
    },
    async getUserActive() {
      const users = await fetch(
          "http://127.0.0.1:8000/api/v1/users/"
      ).then(response => response.json())
      for (let i in users) {
        if (users[i].isActive)
          this.user = users[i]
      }
    },
    close() {
      this.listStudents = this.listStudentsCopy.filter(student => {
        let result = true
        if (this.filterCountry !== '' || this.filterGender !== 0 || this.filter_is_enrolled !== '') {
          if (this.filterCountry !== '')
            result &&= student.country === this.filterCountry
          if (this.filterGender !== 0)
            result &&= student.gender === this.filterGender
          if (this.filter_is_enrolled)
            result &&= student.is_enrolled.toString() === this.filter_is_enrolled
          if (this.filter_in_Rus)
            result &&= student.in_Rus.toString() === this.filter_in_Rus
        }
        return result
      })
      this.isModalVisible = false;
    },
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
      this.closeModal1()
      this.loadListStudents()
    },
    goTo(id) {
      this.$router.push({name: 'Student', params: {id: id}})
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModal1() {
      this.isModalVisible1 = false;
    },
    closeX() {
      this.isModalVisible = false;
      this.filter_in_Rus = ''
      this.filter_is_enrolled = ''
      this.filterGender = 0
      this.filterCountry = ''
      this.loadListStudents()
    },
  },
  computed: {
    searchHandler() {
      return this.listStudents.filter(student => {
        return student.name_ru.toLowerCase().includes(this.search.toLowerCase().replace(/^\s/, '').replace(/\s$/, '')) ||
            student.name_en.toLowerCase().includes(this.search.toLowerCase().replace(/^\s/, '').replace(/\s$/, '')) ||
            student.date_birth.toLowerCase().includes(this.search.toLowerCase().replace(/^\s/, '').replace(/\s$/, '')) ||
            student.country.toLowerCase().includes(this.search.toLowerCase().replace(/^\s/, '').replace(/\s$/, '')) ||
            student.number_doc.toString().includes(this.search.replace(/^\s/, '').replace(/\s$/, ''))
      })
    }
  },
}
</script>
<style>

.btn_nav{
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: none;
  text-align: left;
  background: none;
}

.btn_nav:hover{
  background-color: rgba(0, 121, 107, 0.5);
}


.logout {
  grid-column-start: 1;
  grid-column-end: 3;
  color: white;
  background-color: #00796B;
  border: 2px solid white;
  border-radius: 10px;
}

.back {
  background-color: #00796B;
  border-radius: 100px;
}

.logout:hover, .back:hover{
  background-color: rgb(1, 162, 144);

}


.section_nav {
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;
}

.add__item {
  width: 30%;
}

.add_student {
  overflow-y: scroll;
  padding-top: 300px;
}

.filer {
  width: 70px;
}

.column {
  text-align: center;
  color: #00796B;
}

.showNav:focus + Nav {
  transition: opacity 1s;
}

.header {
  display: grid;
  max-width: 200px;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 2fr 1fr;
}

.section_nav, .footer {
  text-align: center;
  width: 180px;
}

.column-1 {
  text-align: center;
}

option.option-1:hover {
  background-color: #4AAE9B;
}

.search__item {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1.3rem;
  line-height: 1.5;
  color: #00796B;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background: #F5F5F5 url(../assets/search.svg) 98% no-repeat;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
}

.search__item:focus {
  background-color: #fff;
  border-color: #4CAF50;
  outline: 0;
}

.home {
  padding: 20px;
}

.wrapper {
  display: flex;
  position: fixed;
  width: 100%;
  height: 75px;
  padding: 15px 5px;
}

.wrapper__item {
  margin: 0 30px;
  background-color: #E1E1E1;
  border-radius: 10px;
}
</style>