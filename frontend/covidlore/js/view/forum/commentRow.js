import result from "../../../img/profiles/result.svg";
import talkIcon from "../../../img/talk-icon.png";
import likeImage from "../../../img/like.png";
import dislikeImage from "../../../img/dislike.png";
import ReplyFormView from "./replyFormView";
import DiscussionData from "../../model/discussionData";
import showReplies from "../../../img/show-replies.png";
import {processCommentsDataLoad} from "../../controller/discussionController";
import {processChangeCommentScoreRequest} from "../../controller/discussionController";

class CommentRow {

    _discussion;

    constructor(parentDiscussion, commentData, isNewInsert) {
        this._parentDiscussion = parentDiscussion;
        this._commentData = commentData;
        this._isNewInsert = isNewInsert;
    }

    createArticle() {
        const type = this._processCommentType();
        const rowMarkup = this._generateRowMarkup(this._getRowMarkupDesignOption(type));

        if (!type.isSubReply)
            this.insertDirectly(rowMarkup, 'afterend');
        else {
            if (this._isNewInsert)
                    this._processParent(type);

            this._insertSubReply(this._parentDiscussion, rowMarkup);
        }
    }

    _processCommentType() {
        // Not direct reply to question__article
        const isSubReply = this._parentDiscussion.id !== 'main' &&
            !this._parentDiscussion.classList.contains('question__article');

        // Is sub-reply of main__comment__article
        const isReplyToMain = isSubReply && this._parentDiscussion.classList.contains('main__comment__article');

        // Is first sub-reply of main__comment__article
        const isFirstSubReply = isReplyToMain && this._parentDiscussion.querySelectorAll('.sub__comment__article').length === 0;

        return {
            isFirstSubReply: isFirstSubReply,
            isSubReply: isSubReply,
            isReplyToMain: isReplyToMain
        }
    }

    calculateScore() {
        const likeType = localStorage.getItem(`score-comment-post-${this._commentData.commentId}-${DiscussionData.getLoggedInUsername()}`);
        if (likeType !== null)
            if (likeType === 'like')
                return {like: 1, dislike: 0};
            else
                return {like: 0, dislike: 1};
        return {like: 0, dislike: 0};
    }

    _getRowMarkupDesignOption(type) {
        const score = this.calculateScore();
        return {
            likeBlockOpacity: score.like === 1 ? 1 : 0.7,
            dislikeBlockOpacity: score.dislike === 1 ? 1 : 0.7,
            overflow: type.isReplyToMain ? `style="overflow-x: scroll; overflow-y: hidden"` : '',
            aboveLine: !type.isSubReply || type.isFirstSubReply ? '' : `<hr class="article__line">`,
            beyondLine: type.isSubReply ? '' : '<hr class="article__line">',
            articleClass: type.isSubReply ? 'sub__comment__article' : 'main__comment__article',
            replyButtonClass: type.isSubReply ? 'sub__comment__reply' : '',
            replyButtonMarkup: this._commentData.numOfChildren > 0 ?
                this._getRepliesButtonMarkup(type, this._commentData.numOfChildren) : ''
        }
    }

    _insertSubReply(parentDiscussion, rowMarkup) {
        parentDiscussion.lastElementChild.insertAdjacentHTML('afterend', rowMarkup);
        this._discussion = parentDiscussion.lastElementChild;
    }

    insertDirectly(rowMarkup, after) {
        const main = document.querySelector('main');
        const el = main.lastElementChild ?? main;
        el.insertAdjacentHTML(after, rowMarkup);
        this._discussion = main.lastElementChild.previousElementSibling;
    }

    _generateRowMarkup(options) {
        const d = this._commentData;

        return `<article id="comment-post-${d.commentId}" 
                            class="comment__post ${options.articleClass}" ${options.overflow}>
             <div class="comment__row">
                ${options.aboveLine}
                <div class="comment__row-body">
                    <div class="comment__avatar">
                    <svg class="avatar"><use href="${result}#profile${d.user.profileImage}"></use></svg>
                    </div>
                    <div class="comment__body">
                    <div class="comment__metadata">
                        <div class="metadata__account">
                            <span class="nickname">${d.user.username}</span>
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
        this._processRepliesListView(this._parentDiscussion, (el) => {
            let hadHidden = false;
            if (el.classList.contains('hidden-obj')) {
                el.classList.remove('hidden-obj');
                hadHidden = true;
            }
            if (hadHidden)
                this._parentDiscussion.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
        });

        const repliesButton = this._parentDiscussion.querySelector('.reply__button-replies');
        if (repliesButton !== null) {
            repliesButton.innerText = (Number(repliesButton.innerText[0]) + 1) + " Replies";
        } else {
            const repliesButtonMarkup = this._getRepliesButtonMarkup(type, 1);
            this._parentDiscussion.querySelector('.reply__block').insertAdjacentHTML('afterend', repliesButtonMarkup);
            this.addRepliesListenerForNew();
        }
    }

    // Traverses all articles with scope 1 and performs task on each element, except if it is FORM
    _processRepliesListView(parentDiscussion, task) {

        const childDiscussions = parentDiscussion.querySelectorAll(':scope > .comment__post');
        childDiscussions.forEach(el => {
            if (!el.classList.contains('form__article')) task(el);
        })
    }

    addReplyListener() {
        this._discussion.querySelector('.reply__block')
            .addEventListener('click', this._handleReply.bind(this));
    }

    addRepliesListenerForLoadedData() {
        this._discussion.querySelector('.replies__block')?.addEventListener('click', this._handleRepliesList.bind(this));
    }

    addRepliesListenerForNew() {
        const repliesButton = this._parentDiscussion.querySelector('.replies__block');
        if (repliesButton === null || repliesButton?.getAttribute('hasEvent') === 'true')
            return;

        repliesButton.setAttribute('hasEvent', 'true');
        repliesButton.addEventListener('click', this._handleRepliesList.bind(this));
    }

    _handleReply(e) {
        const parentDiscussionRow = e.target.closest('.comment__row');
        new ReplyFormView(parentDiscussionRow);
    }

    _handleRepliesList(e) {
        const article = e.target.closest('.comment__post');
        const parentId = article.id.slice(13);
        processCommentsDataLoad(parentId).then((hasLoadedNewData) => {
            e.target.parentNode.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
            if (!hasLoadedNewData)
                this._processRepliesListView(article, (el) => el.classList.toggle('hidden-obj'));
        });
    }

    addCommentsScoreListener() {
        this._discussion.querySelectorAll('.score__buttons div')
            .forEach(el => el.addEventListener('click', this._handleScoreClick.bind(this)))
    }

    _processScoreText(selectedScoreText, otherScoreText, commentId) {
        const scoreType = localStorage.getItem(`score-${commentId}-${DiscussionData.getLoggedInUsername()}`);
        const isDislikeProcess = scoreType === 'like' && selectedScoreText.id !== 'like';
        const isLikeProcess = scoreType === 'dislike' && selectedScoreText.id !== 'dislike';

        if (isDislikeProcess || isLikeProcess) {
            otherScoreText.innerText = (Number(otherScoreText.innerText) - 1) + '';
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';
        } else if (scoreType == null)
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';
    }

    changeScoreOnClick(selectedScore, selectedScoreText, commentId) {
        const otherScore = selectedScore.previousElementSibling === null
            ? selectedScore.nextElementSibling : selectedScore.previousElementSibling; // has id opposite to selectedLike

        const otherScoreText = otherScore.querySelector('p');

        this._processScoreText(selectedScoreText, otherScoreText, commentId);

        otherScore.style.opacity = 0.7;
        selectedScore.style.opacity = 1.0;
        localStorage.setItem(`score-${commentId}-${DiscussionData.getLoggedInUsername()}`, selectedScoreText.id);
    }

    _handleScoreClick(e) {

        const selectedScore = e.target.closest('div'); // div has id=like/id=dislike
        const selectedScoreText = selectedScore.querySelector('p');
        const commentId = selectedScore.closest('.comment__post').id;
        this.changeScoreOnClick(selectedScore, selectedScoreText, commentId);
        processChangeCommentScoreRequest(commentId, selectedScoreText.id);
    }
}

export default CommentRow;