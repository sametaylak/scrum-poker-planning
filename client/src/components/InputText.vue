<template>
  <div class="input-text">
    <span>{{ label }}</span>
    <input
      v-bind="$attrs"
      v-on="$listeners"
      v-model="val"
    />
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      val: ''
    }
  },
  watch: {
    val () {
      this.$emit('input', this.val)
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
