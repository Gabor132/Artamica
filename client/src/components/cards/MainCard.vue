<template>
  <div id="maincard">
    <md-card class="mainCard md-primary" md-with-hover>
      <div @click="toggleDetails()">
        <md-card-header>
          <md-card-header-text>
            <h1 class="md-title">{{ pageDetails.pageTitle }}</h1>
          </md-card-header-text>
          <md-button class="md-icon-button md-accent">
            <md-icon v-if="this.pageDetails.pageShowDetails" class="md-size-2x"
              >keyboard_arrow_down</md-icon
            >
            <md-icon v-else class="md-size-2x">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-header>
      </div>
      <md-divider />
      <md-card-content v-if="pageDetails.pageShowDetails">
        <slot></slot>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "maincard",
  props: ["pageDetails"],
  data: function() {
    return {};
  },
  methods: {
    toggleDetails: function() {
      this.pageDetails.pageShowDetails = !this.pageDetails.pageShowDetails;
    }
  }
};
</script>

<style scoped></style>
