import DiscussionRowView from "./discussionRowView";
import DiscussionData from "../../model/DiscussionData";
import {readJSONExampleData} from "../../helper";

class DiscussionView {

    constructor() {
        this._showData()
    }

    _showData() {
        Object.entries(readJSONExampleData()).forEach((data) => {
            const [discussionId, discussionData] = data;
            DiscussionData.setNextId(discussionId);

            let parentNode;
            if (discussionId !== '0')
                parentNode = document.querySelector(`#post-${discussionData.parentNode}`);
            else
                parentNode = document.querySelector('main');

            const discussionRowView = new DiscussionRowView(parentNode, discussionData.description);
            discussionRowView.addReplyListener();
            discussionRowView.addLikesListener();

            if (discussionId !== '0')
                discussionRowView.addRepliesListener();
        });
    }
}

export default DiscussionView;