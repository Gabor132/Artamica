<template>
  <div id="appchat">
    <div
      v-for="message in messages"
      v-bind:key="message.id"
      class="myappmessagecardcontainer"
    >
      <md-card class="appmessagecard" md-with-hover>
        <div>
          <md-card-header>
            <md-card-header-text>
              <p v-if="isFromMe(message)" class="appmessage">
                {{ message.sourceUsername }} | {{ message.text }}
              </p>
              <p v-else class="hisappmessage">
                {{ message.sourceUsername }} | {{ message.text }}
              </p>
            </md-card-header-text>
          </md-card-header>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "appchat",
  props: ["messages"],
  data: function() {
    return {
      user: this.$store.getters.getUser,
      newMessage: ""
    };
  },
  methods: {
    isFromMe: function(message) {
      return message.sourceUsername === this.user.name;
    }
  }
};
</script>

<style scoped></style>
