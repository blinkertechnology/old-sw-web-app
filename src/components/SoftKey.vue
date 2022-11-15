<template>
  <div class="softkey">
    <label class="left">{{ softkeys.left }}</label>
    <label class="center">{{ softkeys.center }}</label>
    <label class="right">{{ softkeys.right }}</label>
  </div>
</template>

<script>
export default {
  name: "SoftKey",
  props: {
    softkeys: {
      left: String,
      center: String,
      Right: String
    }
  },
  data: () => ({
    enabled: true,
  }),
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);

    /**
     * Another component registered to use the softkeys, disable this component
     */
    this.$root.$on("update-softkeys-register", (component) => {
      this.enabled = false;
    });

    this.$root.$on("update-softkeys-unregister", () => {
      this.enabled = true;
    });
  },
  methods: {
    onKeyDown(event) {
      if(!this.enabled) return;

      switch(event.key) {
        case "SoftLeft":
          event.preventDefault();
          this.$emit("softLeft");
          break;
        case "SoftRight":
          event.preventDefault();
          this.$emit("softRight");
          break;
        case "Enter":
          event.preventDefault();
          this.$emit("softCenter");
          break;
      }
    }
  }
};
</script>

<style scoped>
.softkey {
  height: 30px;
  max-height: 30px;
  width: 100%;
  max-width: 100%;
  background: white;
  white-space: nowrap;
  padding: 0 5px;
  font-weight: 700;
  box-sizing: border-box;
  margin-top: auto;
  position: absolute;
  bottom: 0;
  background-color: #cccccc;


  display: flex;
  align-items: center;
}

.softkey label {
  color: #242424;
  box-sizing: border-box;
}

.left,
.right {
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  letter-spacing: -0.5px;
}

.left {
  text-align: left;
}

.center {
  color: #242424;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  max-width: 120px;
  width: 100%;
}

.right {
  text-align: right;
}
</style>
