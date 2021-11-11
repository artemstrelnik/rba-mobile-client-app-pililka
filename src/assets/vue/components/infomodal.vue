<template>
    <div v-if="modalData.show" class="modal-wrapper">
      <div class="modal-container">
        <p class="modal-text">{{modalData.text}}</p>
        <form @submit="handleCloseClick">
            <primary-button
            class="info-submit-button"
            title="Закрыть"
            :style="'margin-top: 10px;'"
            />
        </form>
      </div>
    </div>
</template>

<script>
import CONFIG from '../../../config'
import { mapState, mapActions } from 'vuex'
import PrimaryButton from '../components/primarybutton.vue'

export default {
    components: {
        PrimaryButton
    },
    data() {
        return { config: CONFIG };
    },
    computed: {
        ...mapState({
            modalData: (state) => state.modalData,
        })
    },
    methods: {
        handleCloseClick(e) {
            e.preventDefault();
            this.modalData.closeCallback();
            this.hideModal();
        },
        ...mapActions(['hideModal'])
    },
}
</script>