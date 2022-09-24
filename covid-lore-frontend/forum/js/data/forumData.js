import {AJAX_JSON_HEADER, getAuthOption} from "../helper";

class ForumData {

    forumData;

    async fetchForumData() {
        this.forumData = await AJAX_JSON_HEADER("http://192.168.1.113:8090/posts", getAuthOption())
        return this.forumData;
    }

    saveAJAX(title, description) {
        const data = {
            title: title,
            description: description
        }
        const url = 'http://192.168.1.113:8090/posts';
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: getAuthOption().headers
        }).then(() => window.location = 'http://localhost:1234/forum.html');

    }
}

export default new ForumData();