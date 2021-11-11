<template>
  <f7-page class="info">
    <f7-navbar>
      <f7-nav-left
        ><f7-link icon-f7="chevron_left" @click="$f7router.back()"></f7-link
      ></f7-nav-left>
      <f7-nav-title>
        Оформление заказа
      </f7-nav-title>
      <f7-nav-right><div class="navbar-empty"/></f7-nav-right>
    </f7-navbar>

    <div @click="handlePageClick">
      <div
        v-if="activeToast"
        :class="
          activeToast === null
            ? 'profile-toast hide'
            : activeToast === false
            ? 'profile-toast close'
            : 'profile-toast'
        "
      >
        <p class="profile-toast-text">
          {{ toastText }}
        </p>
      </div>

      <form ref="infoInputs" @submit="createOrder" class="info-inputs-block">
        <div class="info-date-input-container">
          <p class="info-input-text">Дата</p>
          <!-- <p v-if="this.date.length != 0" class="info-input-date-text">{{this.date}}</p> -->
          <!-- <p v-if="this.date.length == 0" class="info-input-date-text">Отсутствует</p> -->
          <input class="date-input-order" placeholder="Отсутствует" v-model="date" type="date" />
          <!-- <img
              :src="require('../../images/calendar.svg').default"
              class="info-input-date-icon"
            /> -->
        </div>
        <div class="info-date-input-container">
          <p class="info-input-text" :style="'padding-right: 12px'">Время доставки</p>
          <input v-mask="'##:##'" class="info-input time" :style="'margin-right: 3px !important'" type="text" name="timeStart" />
          <p class="info-input-text"> - </p>
          <input v-mask="'##:##'" class="info-input time" :style="'margin-left: 3px !important'" type="text" name="timeFinish" />
          <img
            :src="require('../../images/clock.svg').default"
            class="info-input-date-icon"
          />
        </div>

        <!-- <div class="info-date-input-block info-name-input">
          <div class="base-input-block">
            <p class="base-input-label">
              Дата доставки
            </p>
            <input class="base-input" v-model="date" type="date" />
          </div>
        </div>
        <div class="info-date-input-block info-name-input">
          <div class="base-input-block">
            <p class="base-input-label">
              Время начала доставки
            </p>
            <input class="base-input" type="time" name="timeStart" />
          </div>
        </div>
        <div class="info-date-input-block info-name-input">
          <div class="base-input-block">
            <p class="base-input-label">
              Время окончания доставки
            </p>
            <input class="base-input" type="time" name="timeFinish" />
          </div>
        </div> -->
        <base-input
          class="info-name-input"
          type="text"
          title="Адрес"
          name="address"
          :placeholder="'Добавьте адрес доставки'"
        />

        <div class="info-date-input-container" :style="'justify-content: space-between !important'">
          <div class="info-date-input-block info-name-input" :style="'width: 30% !important'">
            <div class="base-input-block">
              <p class="base-input-label">
                Кв. / Офис
              </p>
              <input class="base-input mini" type="text" name="flat" />
            </div>
          </div>
          <div class="info-date-input-block info-name-input" :style="'width: 30% !important'">
            <div class="base-input-block">
              <p class="base-input-label">
                Этаж
              </p>
              <input class="base-input mini" type="text" name="floor" />
            </div>
          </div>
          <div class="info-date-input-block info-name-input" :style="'width: 30% !important'">
            <div class="base-input-block">
              <p class="base-input-label">
                Подъезд
              </p>
              <input class="base-input mini" type="text" name="entrance" />
            </div>
          </div>
        </div>

        <base-input
          class="info-name-input"
          type="text"
          title="Комментарий"
          name="comment"
          :placeholder="''"
        />
        <div class="info-date-input-block info-name-input">
            <div class="base-input-block">
              <p class="base-input-label">
                Кол-во персон
              </p>
              <div class="base-input-with-icon">
                <input @blur="hidePersonValues" @input="handlePersonInput" :value="personValue" class="base-input" type="number" name="person" :style="'width: 30% !important; padding-right: 30px;'" />
                <img @click="togglePersonValues" class="base-input-icon person" :src="require('../../images/chevronDown.svg').default" />
              </div>
            </div>
            <div v-if="showPersonValues" class="base-input-select-values person">
              <p v-for="val in personValueList" @click="() => selectPersonValue(val)" v-bind:key="val" class="base-input-select-value person">{{val}}</p>
            </div>
          </div>
        <div class="order-payment">
          Способ оплаты
          <span class="order-payment-type">
            {{ this.payment }}
            <img :style="'padding-left: 10px;'" :src="require('../../images/money.svg').default" />
          </span>
        </div>

        <div class="info-date-input-block info-name-input">
            <div class="base-input-block">
              <p class="base-input-label">
                Сдача с
              </p>
              <div class="base-input-with-icon">
                <input class="base-input" type="number" name="change" :style="'width: 30% !important; padding-right: 31px;'" />
                <img class="base-input-icon" :style="'width: 14px; right: 30px;'" :src="require('../../images/moneyBig.svg').default" />
              </div>
            </div>
          </div>
        <div class="basket-total-price">
          Итого: <b>{{ totalPrice }} ₽</b>
        </div>
        <primary-button
          :type="'submit'"
          class="info-submit-button"
          title="Оформить заказ"
          :style="'margin-top: 0px; margin-bottom: 20px;'"
        />
      </form>
    </div>
  </f7-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Accordion from '../components/accordion'
import AppBar from '../components/appbar'
import PrimaryButton from '../components/primarybutton.vue'
import BaseInput from '../components/input'
import PreLoader from '../components/preloader'
import query from '../utils/axiosQuery'
import CONFIG from '../../../config'
import Loader from '../components/loader.vue'

export default {
  components: {
    Accordion,
    AppBar,
    PrimaryButton,
    BaseInput,
    PreLoader,
    Loader
  },

  data() {
    return {
      date: '',
      address: '',
      flat: '',
      floor: '',
      entrance: '',
      comment: '',
      payment: 'Наличные',
      change: '',
      load: false,
      ru,
      toastText: '',
      activeToast: null,
      showPersonValues: false,
      personValue: 0,
      personValueList: [1, 2, 3, 4]
    }
  },

  computed: {
    totalPrice() {
      return this.basket.reduce((acc, cur) => acc + cur.price, 0)
    },
    ...mapState({
      menu: (state) => state.menu,
      basket: (state) => state.basket,
      user: (state) => state.user
    })
  },

  methods: {
    selectPersonValue(value) {
      this.personValue = value;
      this.hidePersonValues();
    },

    handlePersonInput(e) {
      this.personValue = e.target.value;
    },

    handlePageClick(e) {
      if(this.showPersonValues) {
        this.handleClicksOnPersonShow(e);
      }
    },

    handleClicksOnPersonShow(e) {
      if(e.path[0].className == undefined || !e.path[0].className.includes("person")) {
        return this.hidePersonValues(e);
      }
    },

    displayPersonValues(e) {
      this.showPersonValues = true;
    },

    togglePersonValues(e) {
      this.showPersonValues ? this.hidePersonValues(e) : this.displayPersonValues(e);
    },

    hidePersonValues(e) {
      this.showPersonValues = false;
    },

    async createOrder(e) {
      try {
      e.preventDefault()

      this.displayPreloader();

      const address = e.target.address.value
      const entrance = e.target.entrance.value
      const floor = e.target.floor.value
      const flat = e.target.flat.value
      const person = e.target.person.value || 1
      const timeStart = e.target.timeStart.value
      const timeFinish = e.target.timeFinish.value

      if (!address) {
        this.hidePreloader();
        this.activeToast = true;
        this.toastText = 'Укажите адрес доставки!'
        setTimeout(() => (this.activeToast = false), 2000)
      } else {
        await query
          .post(CONFIG.API_URL + 'order', {
            executeStart: `${this.date}T${timeStart}:00.000Z`,
            executeEnd: `${this.date}T${timeFinish}:00.000Z`,
            type: 'Доставка',
            volume: parseInt(person),
            stateName: 'new',
            includeLoyalityTypes: '',
            address: `Адрес: ${address}, Этаж: ${entrance}, Подъезд: ${floor}, Квартира / Офис: ${flat}`,
            companyId: CONFIG.COMPANY_ID,
            userId: this.user.userId
          })
          .then((res) => {
            if (res.status === 201) {
              this.activeToast = true
              this.toastText = 'Заказ успешно создан!'
              this.addProducts(res.data.id)
              this.addGifts(res.data.id)
              this.hidePreloader();
              this.setBasket([])
              this.showModal({
                text: "Заказ успешно создан!",
                closeCallback: () => {
                  this.$f7router.navigate('/main', {
                    clearPreviousHistory: true
                  })
                }
              });
            } else {
              this.activeToast = true
              this.toastText = 'При создании заказа произошла ошибка!'
              this.hidePreloader();
              setTimeout(() => (this.activeToast = false), 2000)
            }
          })
          .catch((e) => {
            console.log(e);
            this.activeToast = true
            this.toastText = 'При создании заказа произошла ошибка!'
            setTimeout(() => (this.activeToast = false), 2000)
            this.hidePreloader();
          })
      }
      } catch(e) {
        console.log(e);
        this.hidePreloader();
      }
      
    },
    async addProducts(id) {
      const basketProducts = this.basket
        .filter((item) => item.type === 'product')
        .map((product) => {
          return {
            productId: product.id,
            count: product.count,
            components: product.selectedComponents,
            modificators: product.selectedModificators
          }
        })
      await query
        .patch(CONFIG.API_URL + 'order/product/add-many/' + id, basketProducts)
        .catch((e) => {
          this.activeToast = true
          this.toastText = 'При добавлении продуктов к заказу произошла ошибка!'
          setTimeout(() => (this.activeToast = false), 2000)
        })
    },
    async addGifts(id) {
      const basketGifts = this.basket.filter((item) => item.type === 'gift')
      for (let item of basketGifts) {
        await query
          .patch(CONFIG.API_URL + 'order/gift/' + id, {
            giftId: item.id,
            count: item.count
          })
          .catch((e) => {
            this.activeToast = true
            this.toastText =
              'При добавлении подарков к заказу произошла ошибка!'
            setTimeout(() => (this.activeToast = false), 2000)
          })
      }
    },
    ...mapActions(['setBasket', 'displayPreloader', 'hidePreloader', 'showModal'])
  }
}
</script>
