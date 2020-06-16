<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(people)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ people.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="people.showDetails">
            <md-icon class="md-size-4x">chat</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <md-icon class="md-small">chat</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="people.showDetails" />
        <md-card-content v-if="people.showDetails">
          {{people.description}}
        </md-card-content>
        <md-card-actions v-if="people.showDetails">
          <md-button class="md-primary"
          >
            Message
          </md-button>
          <md-button class="md-primary" v-if="!this.isAdmin(people)"
          >
            Kick Out
          </md-button>
        </md-card-actions>
      </md-ripple>
    </div>
  </md-card>
</template>

<script>
// eslint-disable-next-line no-console
/**
 * Imports
 */

/**
 * Exports
 */
export default {
  name: "peoplecard",
  props: ["people", "mainPage"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(people) {
      people.showDetails = !people.showDetails;
      this.$forceUpdate();
    },
    isAdmin: function(people){
      return people.name.toString().endsWith("Administrator");
    }
  }
};
</script>

<style scoped></style>
