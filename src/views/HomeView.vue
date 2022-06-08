<template>
  <div class="wrapper" style="background: #5C5C5C">
    <img class="btn" @click.prevent="sidebarShow = !sidebarShow" type="button"
         data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
         aria-controls="offcanvasWithBothOptions" src="../assets/menu.svg" alt="filter">

    <div>
      <transition class=" " name="slide">
        <menu class="bar " v-show="sidebarShow">
          <div class="offcanvas-body">
            <ul class="user__info">
              <li class="user__info-item">Фамилия</li>
              <li class="user__info-item">Имя</li>
              <li class="user__info-item">Отчество</li>
              <li class="user__info-item email__item">e-mail</li>
            </ul>

            <ul class="tables__list">
              <li class="tables__list-item tabels">Таблицы</li>
              <li class="tables__list-item">Подгот. год</li>
              <li class="tables__list-item">Курсы РЯ</li>
              <li class="tables__list-item podgot">Подгот. 1.5 года(21-22)</li>
              <li class="tables__list-item kvotniky">Квотники</li>
              <li class="tables__list-item">Косяки</li>
            </ul>
            <!--                        <img src="./img/svg/logo.svg" alt="Подготовительное отделение для иностранных учащихся УрФУ" class="header__logo pic" style="width: 170px;">-->
          </div>
        </menu>
      </transition>
    </div>

    <img class="btn filer" type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
         aria-expanded="false" src="../assets/filter.svg" alt="filter" @click="showModal">

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
            <label for="gender">Пол</label>
            <select v-model.number="filterGender" class="form-control" name="gender" id="gender">
              <option value=2>Мужской</option>
              <option value=1>Женский</option>
            </select>
          </div>
          <label class="form-check-label" for="is_enrolled">Факт зачисления</label>
          <div id="is_enrolled">
            <div class="form-check">
              <input type="radio" v-model="is_enrolled" value=true name="enrolled" class="form-check-input"
                     id="is_yes_enrolled">
              <label class="form-check-label" for="is_yes_enrolled">Да</label>
            </div>
            <div class="form-check">
              <input type="radio" v-model="is_enrolled" value=false name="enrolled" class="form-check-input"
                     id="is_no_enrolled">
              <label class="form-check-label" for="is_no_enrolled">Нет</label>
            </div>
          </div>
          <label class="form-check-label" for="in_Rus">Факт нахождения в России</label>
          <div id="in_Rus">
            <div class="form-check">
              <input type="radio" name="in_Rus" v-model="in_Rus" value=true class="form-check-input"
                     id="in_yes_Rus">
              <label class="form-check-label" for="in_yes_Rus">Да</label>
            </div>
            <div class="form-check">
              <input type="radio" name="in_Rus" v-model="in_Rus" value=false class="form-check-input" id="is_no_Rus">
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

    <input class="wrapper__item search__item form-control" v-model="search" placeholder="Найти студента..."
           type="search"
           id="student-search"
           name="student-search">
    <button class="wrapper__item add__item btn btn-primary" style="display: flex; padding: 10px" @click="goToCreate()">
      <svg style="margin-left: 10px" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
           class="bi bi-person-plus"
           viewBox="0 0 16 16">
        <path
            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        <path fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
      </svg>
      <div style="margin-left: 10px">Добавить студента</div>
    </button>
  </div>
  <div class="home">
    <h3>Контрактники</h3>
    <table class="table table-striped table-hover table-back">
      <thead>
      <tr>
        <th scope="col">Фио на русском</th>
        <th scope="col">Фио на английском</th>
        <th scope="col">Дата рождения</th>
        <th scope="col">Пол</th>
        <th scope="col">Страна</th>
        <th scope="col">Номер документа</th>
        <th scope="col">Факт зачисления</th>
        <th scope="col">Факт нахождения в России</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in searchHandler">
        <td>
          <a href="#" @click="goTo(student.id)">
            {{ student.name_ru }}
          </a>
        </td>
        <td>{{ student.name_en }}</td>
        <td>{{ student.date_birth }}</td>
        <td v-if="student.gender===1">Жен</td>
        <td v-else>Муж</td>
        <td>{{ student.country }}</td>
        <td>{{ student.number_doc }}</td>
        <td v-if="student.is_enrolled"><img src="../assets/check.svg"></td>
        <td v-else><img src="../assets/x.svg"></td>
        <td v-if="student.in_Rus"><img src="../assets/check.svg"></td>
        <td v-else><img src="../assets/x.svg"></td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>

import Modal from "@/components/modal";
import student from "@/views/Student";

export default {
  name: 'HomeView',
  data() {
    return {
      isModalVisible: false,
      search: '',
      in_Rus: '',
      is_enrolled: '',
      filterGender: 0,
      filterCountry: '',
      listStudents: [],
      listStudentsCopy: [],
      sidebarShow: false,
    }
  },
  components: {Modal},
  created() {
    this.loadListStudents()

  },
  methods: {
    async loadListStudents() {
      this.listStudents = await fetch(
          "http://127.0.0.1:8000/api/v1/students"
      ).then(response => response.json())
      this.listStudentsCopy = this.listStudents

    },
    close() {
      this.listStudents = this.listStudentsCopy.filter(student =>{
        let result = true
        if (this.filterCountry !== '' || this.filterGender !== 0 || this.is_enrolled !== ''){
          if (this.filterCountry !== '')
            result &&= student.country === this.filterCountry
          if (this.filterGender !== 0)
            result &&= student.gender === this.filterGender
          if (this.is_enrolled)
            result &&= student.is_enrolled.toString() === this.is_enrolled
          if (this.in_Rus)
            result &&= student.in_Rus.toString() === this.in_Rus



          console.log({
            'filterCountry': this.filterCountry,
            'country': student.country,
            'filterGender': this.filterGender,
            'gender': student.gender,
            'filter_is_enrolled': this.is_enrolled,
            'is_enrolled': student.is_enrolled,
            'filter_in_Rus': this.in_Rus,
            'in_Rus': student.in_Rus,
          })
        }
        return result
      })
      this.isModalVisible = false;
    },
    goTo(id) {
      this.$router.push({name: 'Student', params: {id: id}})
    },
    goToCreate() {
      this.$router.push({name: 'CreateStudent'})
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeX() {
      this.isModalVisible = false;
      this.in_Rus = ''
      this.is_enrolled = ''
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
            student.country.toLowerCase().includes(this.search.toLowerCase().replace(/^\s/, '').replace(/\s$/, ''))

      })
    }
  },
}
</script>
<style>


.bar {
  height: 100%;
  background: #000000;
  position: absolute;
}

.add__item {
  width: 30%;
}

.filer {
  width: 70px;
}

.search__item {
  width: 100%;
  padding: 10px;
  background: #E1E1E1 url(../assets/search.svg) 98% no-repeat;
}

.home {
  padding: 20px;
}

.table-back {
  background: white;
}

.wrapper {
  display: flex;
  position: relative;
  height: 75px;
  padding: 15px 5px;
}

.wrapper__item {
  margin: 0 30px;
  background-color: #E1E1E1;
  border-radius: 10px;
}
</style>