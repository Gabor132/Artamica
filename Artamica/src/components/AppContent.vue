<template>
  <div id="appcontent">
    <router-view></router-view>
    <appsserviceresponsebar></appsserviceresponsebar>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup of pagecontent
import appsserviceresponsebar from "./AppServiceResponseBar";
export default {
  name: "appcontent",
  components: {
    appsserviceresponsebar: appsserviceresponsebar
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
