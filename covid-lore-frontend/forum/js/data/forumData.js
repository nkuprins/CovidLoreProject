import {AJAX_JSON_HEADER} from "../helper";

class ForumData {

    fetchForumData() {
        const header = {
            "headers" : {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }

        return AJAX_JSON_HEADER("http://192.168.1.113:8090/callme/ping", header);
    }

}

export default new ForumData();