<template>
  <div id="appcontent">
    <router-view></router-view>
    <appbottombar v-if="this.$isMobile()"></appbottombar>
    <appsserviceresponsebar></appsserviceresponsebar>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup of pagecontent
import appbottombar from "./AppBottomBar";
import appsserviceresponsebar from "./AppServiceResponseBar";
export default {
  name: "appcontent",
  components: {
    appsserviceresponsebar: appsserviceresponsebar,
    appbottombar: appbottombar
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
//
// Local style
#appcontent {
  display: block;
  height: 100%;
}
</style>
