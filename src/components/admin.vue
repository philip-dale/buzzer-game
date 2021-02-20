<template>
  <div>
    <h1 v-if="!connected">NOT CONNECTED TO SERVER</h1>
    <div class="inputDiv">
      <label class="labelClass">Enter Admin ID</label>
      <b-form-input
        class="inputBox"
        v-model="adminId"
        placeholder="Enter Admin ID"
        type="text"
      ></b-form-input>
    </div>
    <b-button @click="correct()" variant="primary">Correct</b-button>
    <b-button @click="wrong()" variant="primary">Wrong</b-button>
    <b-button @click="nextRound()" variant="primary">Next Round</b-button>
    <b-button @click="reset()" variant="primary">Reset</b-button>
  </div>
</template>

<script>
export default {
  name: "admin",
  computed: {
    adminId: {
      get: function () {
        return this.$store.getters.adminId;
      },
      set: function (newValue) {
        this.$store.commit("adminId", newValue);
      },
    },
    connected() {
      return this.$store.getters.connected
    }
  },
  methods: {
    correct() {
      this.$store.dispatch("adminAction", "correct");
    },
    wrong() {
      this.$store.dispatch("adminAction", "wrong");
    },
    nextRound() {
      this.$store.dispatch("adminAction", "nextRound");
    },
    reset() {
      this.$store.dispatch("adminAction", "reset");
    },
  },
};
</script>