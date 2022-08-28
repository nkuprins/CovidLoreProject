import CommentRow from "./commentRow";

class ReplyFormView {

    constructor(parentDiscussionRow, loadDataHandler, saveDataHandler) {
        this._parentDiscussion = parentDiscussionRow.parentNode;
        this._showForm(parentDiscussionRow);
        this._addReplyFormListener();
        this.loadDataHandler = loadDataHandler;
        this.saveDataHandler = saveDataHandler;
    }

    _showForm(parentDiscussionRow) {
        const formMarkup = `<article class="discussion__post form__article">
             <div class="discussion__row">
                  <form action="" method="POST">
                    <label>
                      <textarea name="description" type="text"></textarea>
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
        parentDiscussionRow.scrollIntoView();
    }

    _addReplyFormListener() {
        const form = document.querySelector('form')
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

        const parentId = this._parentDiscussion.id.slice(13);

        // We first want to load replies of this parent node, if they were not loaded yet
        this.loadDataHandler(parentId).then(() => {
            const commentData = this.saveDataHandler(parentId, replyText);
            const commentRow = new CommentRow(this._parentDiscussion, commentData, true);
            commentRow.showPost();
            commentRow.addReplyListener();
            commentRow.addCommentsScoreListener();
        })
    }
}

export default ReplyFormView;
