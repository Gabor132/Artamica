<template>
    <md-card md-with-hover class="md-primary">
        <md-card-media>
            <img v-if="art.imageUrl !== null" :src="art.imageUrl" alt="portrait">
            <md-icon v-else class="md-size-5x">{{art.type}}</md-icon>
        </md-card-media>
        <md-card-header>
            <md-card-header-text>
                <div class="md-title">{{art.name}}</div>
                <div class="md-subhead">by {{art.artist}}</div>
            </md-card-header-text>
            <md-card-media>
                <md-avatar class="md-avatar-icon md-large md-secondary">
                    <md-icon>{{art.type}}</md-icon>
                </md-avatar>

            </md-card-media>
        </md-card-header>
        <md-card-area/>
        <md-card-expand>
            <md-card-actions md-alignment="space-between">
                <div>
                    <md-button v-if="art.liked" class="md-icon-button md-accent" v-on:click="$emit('liked-artwork', art.id)">
                        <md-icon>favorite</md-icon>
                    </md-button>
                    <md-button v-else class="md-icon-button"  v-on:click="$emit('liked-artwork', art.id)">
                        <md-icon>favorite</md-icon>
                    </md-button>
                </div>
                <md-card-expand-trigger>
                    <md-button class="md-icon-button md-accent">
                        <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                </md-card-expand-trigger>
            </md-card-actions>
            <md-card-expand-content>
                <md-card-content>
                    {{ art.description }}
                </md-card-content>
            </md-card-expand-content>
        </md-card-expand>
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
        name: "artworkcard",
        props: ["art"],
        data: function() {
            return {
                isLiked: this.art.liked
            };
        },
        methods: {
            isAdmin: function(people){
                return people.name.toString().endsWith("Administrator");
            }
        }
    };
</script>

<style scoped></style>
