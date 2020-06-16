<template>
  <div id="appbottombar">
    <md-bottom-bar md-type="shift" md-sync-route="true">
      <md-bottom-bar-item id="bottom-bar-item-artists" to="/artists" md-label="Artists" md-icon="people"></md-bottom-bar-item>
      <md-bottom-bar-item id="bottom-bar-item-artworks" to="/artworks" md-label="Artworks" md-icon="portrait"></md-bottom-bar-item>
      <md-bottom-bar-item id="bottom-bar-item-messages" to="/messages" md-label="Messages" md-icon="message"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: "appbottombar"
};
</script>

<style lang="scss" scoped>
  .md-bottom-bar {
    display: inline-block;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
  }
</style>
