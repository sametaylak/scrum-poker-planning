<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.container {
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  padding-right: 10px;
  padding-left: 10px;
}

.flex {
  display: flex;
}

.flex-primary {
  flex: 1;
}

.btn {
  display: block;
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  &.primary {
    background: $primary;
    color: $white;
  }
  &:disabled {
    cursor: not-allowed;
    background: $gray;
    color: black;
  }
}
</style>
