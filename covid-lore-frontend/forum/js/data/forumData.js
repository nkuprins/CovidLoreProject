import {AJAX_JSON_HEADER} from "../helper";

class ForumData {

    forumData;

    async fetchForumData() {
        const header = {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }

        this.forumData = await AJAX_JSON_HEADER("http://192.168.1.113:8090/posts", header)
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
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }
        }).then(() => window.location = 'http://localhost:1234/forum.html');

    }
}

export default new ForumData();