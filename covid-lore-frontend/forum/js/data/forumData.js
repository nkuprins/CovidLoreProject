import {AJAX_JSON_HEADER, getAuthOption} from "../helper";
import {API_GATEWAY} from "../config";

class ForumData {

    forumData;

    async fetchForumData() {
        this.forumData = await AJAX_JSON_HEADER(`${API_GATEWAY}/posts`, getAuthOption())
        return this.forumData;
    }

    saveAJAX(title, description) {
        const data = {
            title: title,
            description: description
        }
        const url = `${API_GATEWAY}/posts`;
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: getAuthOption().headers
        }).then(() => window.location = 'http://localhost:1234/forum.html');

    }
}

export default new ForumData();