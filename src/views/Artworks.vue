<template>
  <div class="artworks">
    <div v-if="artworks.length == 0">
      <md-empty-state
              md-icon="portrait"
              md-label="Artworks"
              md-description="Currently there are no available artworks in your area"
      >
      </md-empty-state>
    </div>
    <div v-else v-for="art in artworks" v-bind:key="art.id">
      <md-card>
        <md-card-media>
          <img src="/assets/examples/monalisa.jpg" alt="people">
        </md-card-media>
        <md-card-header>
          <div class="md-title">{{art.name}}</div>
          <div class="md-subhead">by {{art.artist}}</div>
        </md-card-header>
        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button>Action</md-button>
              <md-button>Action</md-button>
            </div>
            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>
          <md-card-expand-content>
            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Local Setup
export default {
  name: "artworks",
  components: {
  },

  data: function() {
    return {
      artworks : [
        {
          id: 0,
          name: "Banana",
          type: "0",
          artist: "Magdalena"
        },
        {
          id: 1,
          name: "Monalisa",
          type: "1",
          artist: "Magdalena"
        },
        {
          id: 2,
          name: "Fancy Chairs",
          type: "2",
          artist: "Petrovik"
        },
        /*{
          id: 3,
          name: "One Stick to Rule Them All",
          type: "3",
          artist: "Casandra"
        },*/
      ]
    }
  },
  methods: {
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
