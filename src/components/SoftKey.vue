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
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onKeyDown(event) {
      switch(event.key) {
        case "SoftLeft":
        case "ArrowLeft":
          event.preventDefault();
          this.$emit("softLeft");
          break;
        case "SoftRight":
        case "ArrowRight":
          event.preventDefault();
          this.$emit("softRight");
          break;
        case "Enter":
        case "ArrowUp":
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
  border-top: 2px #cbcbcb solid;
  display: flex;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0 5px;
  font-weight: 700;
  box-sizing: border-box;
  line-height: 26px;
  margin-top: auto;
  position: absolute;
  bottom: 0;
  background-color: #cccccc;
}

.left,
.right {
  font-weight: 600;
  font-size: 14px;
  color: #242424;
  overflow: hidden;
  width: 100%;
  letter-spacing: -0.5px;
  box-sizing: border-box;
  text-overflow: ellipsis;
}

.left {
  text-align: left;
  padding-right: 5px;
}

.center {
  color: #242424;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.right {
  text-align: right;
  padding-left: 5px;
}
</style>
