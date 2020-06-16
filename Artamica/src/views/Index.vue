<template>
    <div id="index">
        <md-empty-state
                md-icon="emoji_people"
                :md-label="welcome_message"
                md-description="Let's make your house a home!"
        >
        </md-empty-state>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {
        },
        data: function() {
            return {
                welcome_message: "Welcome to " + process.env.VUE_APP_TITLE,
                user: this.$store.getters.getUser,
                welcomePage: {
                    pageTitle: "Welcome",
                    pageKey: 1,
                    pageShowDetails: true,
                    pageNoText: "No Welcome"
                }
            };
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>
