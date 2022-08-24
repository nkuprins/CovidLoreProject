
import Keycloak from "keycloak-js";
import jwtDecode from 'jwt-decode';

class SecureLogin {

    _logoutButton = document.getElementById("logout_button");

    initKeyCloak() {

        const config = {
            url: 'http://localhost:8080',
            realm: 'MyRealm',
            clientId: 'frontend-login-client'
        }
        const keycloak = new Keycloak(config);
        keycloak.init({onLoad: `login-required`, checkLoginIframe: false}).then(authenticated => {
            if (authenticated)
                localStorage.setItem("accessToken", keycloak.token);
        })

        this._logoutButton.addEventListener('click', () => keycloak.logout({
            redirectUri: "http://localhost:1234"
        }))
    }

}

export default new SecureLogin();
