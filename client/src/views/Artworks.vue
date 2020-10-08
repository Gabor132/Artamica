<template>
  <div class="artworks">
    <div v-if="artworks.length === 0">
      <md-empty-state
              md-icon="portrait"
              md-label="Artworks"
              md-description="Currently there are no available artworks in your area"
      >
      </md-empty-state>
    </div>
    <div v-else>
      <div v-if="! this.$isMobile()">
        <artworkcard v-for="art in artworks" v-bind:key="art.id" v-bind:art="art" v-on:liked-artwork="likedArtwork"/>
      </div>
      <div class="scrolling-wrapper" v-else>
        <artworkcard v-for="art in artworks" v-bind:key="art.id" v-bind:art="art" v-on:liked-artwork="likedArtwork"/>
      </div>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import artworkcard from "../components/cards/ArtworkCard.vue"
// Local Setup
export default {
  name: "artworks",
  components: {
    artworkcard:artworkcard
  },

  data: function() {
    return {
      artworks : [
        {
          id: 0,
          name: "Banana",
          type: "help",
          artist: "Johnny",
          description: "Best measuring unit that we have available, get used to using it",
          imageUrl: "../../assets/examples/banana.jpg",
          liked: false
        },
        {
          id: 1,
          name: "Monalisa",
          type: "brush",
          artist: "Vasile",
          description: "Definitely not stolen",
          imageUrl: "../../assets/examples/monalisa.jpg",
          liked: true
        },
        {
          id: 2,
          name: "Fancy Chairs",
          type: "weekend",
          artist: "Petrovik",
          description: "Hello, have a seat",
          imageUrl: "../../assets/examples/chair.jpg",
          liked: false
        },
        {
          id: 5,
          name: "Fun Selfies",
          type: "camera_alt",
          artist: "Johnny",
          description: "Most awkward selfies, uga",
          imageUrl: "../../assets/examples/selfie.jpg",
          liked: true
        },
        {
          id: 3,
          name: "One Stick to Rule Them All",
          type: "help",
          artist: "Casandra",
          description: "My dad gave me this for my birthday",
          imageUrl: "../../assets/examples/stick.jpg",
          liked: false
        },
        {
          id: 4,
          name: "Complete works of Agatha Cristy",
          type: "description",
          artist: "A.Cristy",
          description: "Die Krimi fur dir!",
          imageUrl: "../../assets/examples/book.jpg",
          liked: false
        },
        {
          id: 5,
          name: "Movie Acting",
          type: "videocam",
          artist: "Mr. Fancy Move Actor",
          description: "I do my own stunts",
          imageUrl: "../../assets/examples/actor_movie.jpg",
          liked: false
        }
      ]
    }
  },
  methods: {
    likedArtwork: function(value){
      for(var art in this.artworks){
        if(art.id === value){
          art.liked = !art.liked;
        }
      }
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
