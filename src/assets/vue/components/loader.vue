<template>
    <div v-if="showPreloader" class="preloader-wrapper">
      <div class="preloader-container">
        <f7-preloader />
      </div>
    </div>
</template>

<script>
import CONFIG from '../../../config'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return { config: CONFIG };
    },
    computed: {
        ...mapState({
            showPreloader: (state) => state.showPreloader,
        })
  },
}
</script>