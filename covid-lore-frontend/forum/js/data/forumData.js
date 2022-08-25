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
}

export default new ForumData();