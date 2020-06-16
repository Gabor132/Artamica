<template>
  <div id="AddingPage">
    <md-card class="mainCard md-primary" md-with-hover>
      <div>
        <md-card-header>
          <md-card-header-text>
            <h1 class="md-title">{{ title }}</h1>
          </md-card-header-text>
        </md-card-header>
      </div>
      <md-divider />
      <slot></slot>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "addingpage",
  props: ["title", "newObject"]
};
</script>

<style scoped></style>
