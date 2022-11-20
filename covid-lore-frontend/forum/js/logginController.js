
import Keycloak from "keycloak-js";
import {REALM_URL} from "./config";

class SecureLogin {

    _logoutButton = document.getElementById("logout_button");

    async initKeyCloak() {

        const config = {
            url: REALM_URL,
            realm: 'MyRealm',
            clientId: 'frontend-login-client'
        }
        const keycloak = new Keycloak(config);
        this._logoutButton.addEventListener('click', () => keycloak.logout({
            redirectUri: "http://localhost:1234/forum.html"
        }))

        const authenticated = await keycloak.init({onLoad: `login-required`, checkLoginIframe: false});
        if (authenticated)
            localStorage.setItem("accessToken", keycloak.token);
        return authenticated;
    }

}

export default new SecureLogin();
