import DiscussionRowView from "./discussionRowView";
import DiscussionData from "../../model/DiscussionData";

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

        DiscussionData.updateToNextId();
        const discussionRowView = new DiscussionRowView(this._parentDiscussion, replyText);
        discussionRowView.addReplyListener();
        discussionRowView.addLikesListener();
    }
}

export default DiscussionFormView;
