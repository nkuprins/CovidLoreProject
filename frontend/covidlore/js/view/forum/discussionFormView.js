import CommentRow from "./commentRow";
import DiscussionData from "../../model/DiscussionData";
import {dataToNormalFormat} from "../../helper";
import {processCommentsDataCreate, processCommentsDataLoad} from "../../controller/discussionController";

class DiscussionFormView {

    constructor(parentDiscussionRow) {
        this._parentDiscussion = parentDiscussionRow.parentNode;
        this._showForm(parentDiscussionRow);
    }

    _showForm(parentDiscussionRow) {
        const formMarkup = `<article class="discussion__post form__article">
             <div class="discussion__row">
                  <form action="" method="POST">
                    <label>
                      <textarea name="opinion" type="text"></textarea>
                    </label>
                    <div class="form__actions">
                      <button class="form__button form__submit" type="submit">Reply</button>
                      <button class="form__button form__cancel"  type="button">Cancel</button>
                    </div>
                  </form>
             </div>
             </article>`;

        this._handleFormCancel() // close form if it was already open
        parentDiscussionRow.insertAdjacentHTML('afterend', formMarkup);
        const form = document.querySelector('form'); // Get just inserted form
        parentDiscussionRow.scrollIntoView();
        this._addReplyFormListener(form);
    }

    _addReplyFormListener(form) {
        form.querySelector('.form__cancel').addEventListener('click', this._handleFormCancel);
        form.addEventListener('submit', this._handleSubmitButton.bind(this));
    }

    _handleFormCancel() {
        const formArticle = document.querySelector('.form__article');
        formArticle?.remove();
    }

    _handleSubmitButton(e) {
        e.preventDefault();

        const replyFormArticle = e.target.closest('.discussion__post'); // Get the form article
        const replyText = replyFormArticle.querySelector('textarea').value; // Get text in the form
        replyFormArticle.remove(); // Remove the form article

        console.log("Parent id:");
        console.log(this._parentDiscussion.id);
        const parentId = this._parentDiscussion.id.slice(5);

        processCommentsDataLoad(parentId).then(() => {
            const commentData = processCommentsDataCreate(parentId, replyText);
            console.log("we insert" + commentData);
            const commentRow = new CommentRow(this._parentDiscussion, commentData, true);
            commentRow.createArticle();
            commentRow.addReplyListener();
            commentRow.addScoreListener();
        })

        DiscussionData.nextPrimaryKey();
    }
}

export default DiscussionFormView;
