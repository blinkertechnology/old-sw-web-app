<template>
  <div class="hello">
    <h1>Welcome to Sorted Wallet<br /></h1>

    <section>
      <p>CONTACT US @3924y23947</p>
      <p>email ID no-reply@gmail.com</p>
      <p><button @click="back">BACK</button></p>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push({ name: "hello2" });
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: normal;
  color: #42b983;
}
section {
  font-family: 'Poppins';
  font-size: 1.3em;
  line-height: 1.5em;
  border: 3px;
  border-style: solid;
  border-color: #000000;
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
</style>
