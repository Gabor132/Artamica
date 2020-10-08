import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import Store from "../store";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

let instance;


export const getInstance = () => instance;

export const useAuth0 = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    ...options
}) => {

    if (instance) return instance;

    instance = new Vue({
        data() {
            return {
                loading: true,
                isAuthenticated: false,
                user: JSON.parse(sessionStorage.getItem("user-details")),
                auth0Client: null,
                popupOpen: false,
                error: null
            };
        },
        methods: {
            async loginWithPopup(o) {
                this.popupOpen = true;

                try{
                    await this.auth0Client.loginWithPopup(o);
                }catch(e) {
                    console.error(e);
                }finally {
                    this.popupOpen = false;
                }

                this.user = await this.auth0Client.getUser();
                await Store.dispatch("SAVE_USER", this.user);
                this.isAuthenticated = true;
            },
            async handlerRedirectCallback() {
                this.loading = true;
                try{
                    await this.auth0Client.handlerRedirectCallback();
                    this.user = await this.auth0Client.getUser();
                    await Store.dispatch("SAVE_USER", this.user);
                    this.isAuthenticated = true;
                }catch (e){
                    this.error = e;
                }finally {
                    this.loading = false;
                }
            },
            loginWithRedirect(o) {
                return this.auth0Client.loginWithRedirect(o);
            },
            /** Returns all the claims present in the ID token */
            getIdTokenClaims(o) {
                return this.auth0Client.getIdTokenClaims(o);
            },
            /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
            getTokenSilently(o) {
                return this.auth0Client.getTokenSilently(o);
            },
            /** Gets the access token using a popup window */

            getTokenWithPopup(o) {
                return this.auth0Client.getTokenWithPopup(o);
            },
            /** Logs the user out and removes their session on the authorization server */
            async logout(o) {
                await Store.dispatch("CLEAR_USER");
                this.user = null;
                return this.auth0Client.logout(o);
            }
        },
        async created() {
            // Create a new instance of the SDK client using members of the given options object
            this.auth0Client = await createAuth0Client({
                domain: options.domain,
                client_id: options.clientId,
                audience: options.audience,
                redirect_uri: redirectUri
            });

            try {
                // If the user is returning to the app after authentication..
                if (
                    window.location.search.includes("code=") &&
                    window.location.search.includes("state=")
                ) {
                    // handle the redirect and retrieve tokens
                    const { appState } = await this.auth0Client.handleRedirectCallback();

                    // Notify subscribers that the redirect callback has happened, passing the appState
                    // (useful for retrieving any pre-authentication state)
                    onRedirectCallback(appState);
                }
            } catch (e) {
                this.error = e;
            } finally {
                // Initialize our internal authentication state
                this.isAuthenticated = await this.auth0Client.isAuthenticated();
                this.user = await this.auth0Client.getUser();
                if(this.user !== null) {
                    await Store.dispatch("SAVE_USER", this.user);
                }else{
                    await Store.dispatch("CLEAR_USER");
                }
                this.loading = false;
            }
        }
    });

    return instance;
};

export const Auth0Plugin = {
    install(Vue, options) {
        Vue.prototype.$auth = useAuth0(options);
    }
};
