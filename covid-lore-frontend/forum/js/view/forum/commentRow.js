import result from "../../../img/profiles/result.svg";
import talkIcon from "../../../img/talk-icon.png";
import likeImage from "../../../img/like.png";
import dislikeImage from "../../../img/dislike.png";
import ReplyFormView from "./replyFormView";
import showReplies from "../../../img/show-replies.png";

class CommentRow {

    comment;

    constructor(parentDiscussion, commentData, isNewInsert, repliesHandler, saveDataHandler) {
        this.parentComment = parentDiscussion;
        this.commentData = commentData;
        this.isNewInsert = isNewInsert;
        this.repliesHandler = repliesHandler;
        this.saveDataHandler = saveDataHandler;
    }

    showPost() {
        const cssType = this._getCommentCSSType();
        const rowMarkup = this._generateRowMarkup(this._getRowMarkupCSSOption(cssType));

        if (!cssType.isSubReply)
            this.insertDirectly(rowMarkup, 'afterend');
        else {
            if (this.isNewInsert)
                this._processParent(cssType);

            this._insertSubReply(this.parentComment, rowMarkup);
        }
    }

    _getCommentCSSType() {
        // Not direct reply to question__article
        const isSubReply = this.parentComment.id !== 'main' &&
            !this.parentComment.classList.contains('question__article');

        // Is sub-reply of main__comment__article
        const isReplyToMain = isSubReply && this.parentComment.classList.contains('main__comment__article');

        // Is first sub-reply of main__comment__article
        const isFirstSubReply = isReplyToMain && this.parentComment.querySelectorAll('.sub__comment__article').length === 0;

        return {
            isFirstSubReply: isFirstSubReply,
            isSubReply: isSubReply,
            isReplyToMain: isReplyToMain
        }
    }

    // If we find on local storage a liketype, then load it, otherwise return {0, 0}
    calculateScore() {
        const scoreType = localStorage.getItem(`score-comment-post-${this.commentData.commentId}`);
        if (scoreType !== null)
            if (scoreType === 'like')
                return {like: 1, dislike: 0};
            else
                return {like: 0, dislike: 1};
        return {like: 0, dislike: 0};
    }

    _getRowMarkupCSSOption(cssType) {
        const score = this.calculateScore();
        return {
            likeBlockOpacity: score.like === 1 ? 1 : 0.7,
            dislikeBlockOpacity: score.dislike === 1 ? 1 : 0.7,
            overflow: cssType.isReplyToMain ? `style="overflow-x: scroll; overflow-y: hidden"` : '',
            aboveLine: !cssType.isSubReply || cssType.isFirstSubReply ? '' : `<hr class="article__line">`,
            beyondLine: cssType.isSubReply ? '' : '<hr class="article__line">',
            articleClass: cssType.isSubReply ? 'sub__comment__article' : 'main__comment__article',
            replyButtonClass: cssType.isSubReply ? 'sub__comment__reply' : '',
            replyButtonMarkup: this.commentData.numOfChildren > 0 ?
                this._getRepliesButtonMarkup(cssType, this.commentData.numOfChildren) : ''
        }
    }

    _insertSubReply(parentDiscussion, rowMarkup) {
        parentDiscussion.lastElementChild.insertAdjacentHTML('afterend', rowMarkup);
        this.comment = parentDiscussion.lastElementChild;
    }

    insertDirectly(rowMarkup, after) {
        const main = document.querySelector('main');
        const el = main.lastElementChild ?? main;
        el.insertAdjacentHTML(after, rowMarkup);
        this.comment = main.lastElementChild.previousElementSibling;
    }

    _generateRowMarkup(options) {
        const d = this.commentData;

        return `<article id="${d.commentId}" 
                            class="comment__post ${options.articleClass}" ${options.overflow}>
             <div class="comment__row">
                ${options.aboveLine}
                <div class="comment__row-body">
                    <div class="comment__avatar">
                    <svg class="avatar"><use href="${result}#profile1"></use></svg>
                    </div>
                    <div class="comment__body">
                    <div class="comment__metadata">
                        <div class="metadata__account">
                            <span class="nickname">${this.isNewInsert ? 'You' : d.creatorUsername}</span>
                        </div>
                        <div class="metadata__post-time">${d.commentDate ?? d.date}</div>
                    </div>
                    <div class="comment__content">
                        <div class="comment__opinion">${d.description}</div>
                    <nav class="comment__menu">
                        <div class="reply reply__block">
                            <img class="reply__icon" src="${talkIcon}" alt="Reply icon">
                            <button class="reply__button reply__button-reply">Reply</button>
                        </div>
                        ${options.replyButtonMarkup}
                        <div class="score__buttons">
                            <div style="opacity: ${options.likeBlockOpacity}">
                                <p id="like">${d.sumLike}</p> <img class="score__image" src="${likeImage}" alt="like">
                            </div>
                            <div style="opacity: ${options.dislikeBlockOpacity}">
                                <p id="dislike">${d.sumDisLike * -1}</p> <img class="score__image" src="${dislikeImage}" alt="dislike">
                            </div>
                        </div>
                    </nav>
                    </div>
                    </div>
                </div>
             </div>
            </article>
            ${options.beyondLine}`;
    }

    _getRepliesButtonMarkup(type, numReplies) {
        return `<div class="reply replies__block">
                <button class="reply__button reply__button-replies">${numReplies} Replies</button>
                <img class="replies__icon" src="${showReplies}" alt="List reply icon">
                </div>`
    }

    // If parent node of the new article has 'Replies ...' button, then increment value by one,
    // otherwise use repliesButtonMarkup to generate 'Reply 1' button and attach listener to it.
    _processParent(type) {

        // Show replies of the parent node if they were hidden
        // or if the replies of the parent node were not loaded yet, then load them
        this._processRepliesListView(this.parentComment, (el) => {
            let hadHidden = false;
            if (el.classList.contains('hidden-obj')) {
                el.classList.remove('hidden-obj');
                hadHidden = true;
            }
            if (hadHidden)
                this.parentComment.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
        });

        const repliesButton = this.parentComment.querySelector('.reply__button-replies');
        if (repliesButton !== null) {
            repliesButton.innerText = (Number(repliesButton.innerText[0]) + 1) + " Replies";
        } else {
            const repliesButtonMarkup = this._getRepliesButtonMarkup(type, 1);
            this.parentComment.querySelector('.reply__block').insertAdjacentHTML('afterend', repliesButtonMarkup);
            this.addRepliesListenerForNew();
        }
    }

    // Traverses all articles with scope 1 and performs task on each element, except if it is FORM
    _processRepliesListView(parentComment, task) {

        const childDiscussions = parentComment.querySelectorAll(':scope > .comment__post');
        childDiscussions.forEach(el => {
            if (!el.classList.contains('form__article')) task(el);
        })
    }

    addReplyListener() {
        this.comment.querySelector('.reply__block')
            .addEventListener('click', function (e) {
                const parentCommentRow = e.target.closest('.comment__row');
                new ReplyFormView(parentCommentRow, this.repliesHandler, this.saveDataHandler);
            }.bind(this));
    }

    addRepliesListenerForLoadedData() {
        this.comment.querySelector('.replies__block')?.addEventListener('click', this._handleRepliesList.bind(this));
    }

    // Adds a replies listener to parent only if it did not have it before
    addRepliesListenerForNew() {
        const repliesButton = this.parentComment.querySelector('.replies__block');
        if (repliesButton === null || repliesButton?.getAttribute('hasEvent') === 'true')
            return;

        repliesButton.setAttribute('hasEvent', 'true');
        repliesButton.addEventListener('click', this._handleRepliesList.bind(this));
    }

    _handleRepliesList(e) {
        const article = e.target.closest('.comment__post');
        const parentId = article.id.slice(13);
        this.repliesHandler(parentId).then((hasLoadedNewData) => {
            e.target.parentNode.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
            if (!hasLoadedNewData)
                this._processRepliesListView(article, (el) => el.classList.toggle('hidden-obj')); // hide posts
        });
    }

    addCommentsScoreListener(handler) {
        this.comment.commentScoreChangeHandler = handler
        this.comment.querySelectorAll('.score__buttons div')
            .forEach(el => el.addEventListener('click', this._handleScoreClick.bind(this)))
    }

    _processScoreText(selectedScoreText, otherScoreText, postId) {
        const scoreType = localStorage.getItem(`score-${postId}}`);
        const isScoreChange = (scoreType === 'like' && selectedScoreText.id !== 'like')
        || (scoreType === 'dislike' && selectedScoreText.id !== 'dislike');

        if (isScoreChange) {
            otherScoreText.innerText = (Number(otherScoreText.innerText) - 1) + '';
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';
        } else if (scoreType == null)
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';
    }

    changeScoreOnClick(selectedScore, selectedScoreText, postId) {
        const otherScore = selectedScore.previousElementSibling === null
            ? selectedScore.nextElementSibling : selectedScore.previousElementSibling;
        const otherScoreText = otherScore.querySelector('p');

        this._processScoreText(selectedScoreText, otherScoreText, postId);

        otherScore.style.opacity = 0.7;
        selectedScore.style.opacity = 1.0;
        localStorage.setItem(`score-${postId}}`, selectedScoreText.id);
    }

    _handleScoreClick(e) {

        const selectedScore = e.target.closest('div'); // div has id=like/id=dislike
        const selectedScoreText = selectedScore.querySelector('p');
        const postId = selectedScore.closest('.comment__post').id;
        this.changeScoreOnClick(selectedScore, selectedScoreText, postId);
        this.comment.commentScoreChangeHandler(postId, selectedScoreText.id);
    }
}

export default CommentRow;