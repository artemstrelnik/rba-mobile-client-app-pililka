<template>
  <div class="i-input-block">
    <input
      :disabled="disabled"
      :ref="elRef"
      @focus="onFocusedPhoneInput"
      @blur="checkFocused"
      v-focus="autofocus"
      class="i-input"
      v-mask="pattern"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      v-model="inputValue"
    />
    <img v-if="icon" :src="icon" />
  </div>
</template>
<script>
export default {
  props: [
    "title",
    "disabled",
    "type",
    "name",
    "placeholder",
    "pattern",
    "autofocus",
    "onlyfocused",
    "elRef",
    "value",
    "onFocusedPhoneInput",
    "onBlurPhoneInput",
    "icon",
  ],
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    checkFocused: function (e) {
      this.onBlurPhoneInput();
      if (this.onlyfocused === "true") {
        e.target.focus();
      }
    },
  },
};
</script>
