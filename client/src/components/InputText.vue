<template>
  <div class="input-text">
    <span>{{ label }}</span>
    <input
      ref="inputText"
      :value="value"
      @input="updateInput"
    />
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    updateInput () {
      this.$emit('input', this.$refs.inputText.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-text {
  display: flex;
  align-items: center;
  input {
    margin-left: 16px;
    flex: 1;
  }
}
</style>
