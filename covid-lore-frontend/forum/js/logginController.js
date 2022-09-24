
import Keycloak from "keycloak-js";

class SecureLogin {

    _logoutButton = document.getElementById("logout_button");

    async initKeyCloak() {

        const config = {
            url: 'http://localhost:8080',
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
