import result from "../../../img/profiles/result.svg";
import talkIcon from "../../../img/talk-icon.png";
import likeImage from "../../../img/like.png";
import dislikeImage from "../../../img/dislike.png";
import DiscussionFormView from "./discussionFormView";
import DiscussionData from "../../model/DiscussionData";
import showReplies from "../../../img/show-replies.png";
import {processCommentsData} from "../../controller/discussionController";

class CommentRow {

    discussion;

    constructor(parentDiscussion, commentData) {
        this._parentDiscussion = parentDiscussion;
        this._commentData = commentData;
    }

    createArticle() {
        const type = this._processCommentType();
        const rowMarkup = this._generateRowMarkup(this._getRowMarkupDesignOption(type));

        if (!type.isSubReply)
            this.insertDirectly(rowMarkup, 'afterend');
        else {
            this._processParent(type);
            this._insertSubReply(this._parentDiscussion, rowMarkup);
        }
    }

    _processCommentType() {
        // Not direct reply to question__article
        const isSubReply = this._parentDiscussion.id !== 'main' &&
            !this._parentDiscussion.classList.contains('question__article');

        // Is sub-reply of main__discussion__article
        const isReplyToMain = isSubReply && this._parentDiscussion.classList.contains('main__discussion__article');

        // Is first sub-reply of main__discussion__article
        const isFirstSubReply = isReplyToMain && this._parentDiscussion.querySelectorAll('.sub__discussion__article').length === 0;

        return {
            isFirstSubReply: isFirstSubReply,
            isSubReply: isSubReply,
            isReplyToMain: isReplyToMain
        }
    }

    calculateScore() {
        let likeValue = 0;
        let dislikeValue = 0;
        const likeType = localStorage.getItem(`likeType-post-${DiscussionData.getLastId()}`);
        if (likeType !== null)
            if (likeType === 'like')
                likeValue = 1;
            else
                dislikeValue = 1;

        return {like: likeValue, dislike: dislikeValue};
    }

    _getRowMarkupDesignOption(type) {
        const score = this.calculateScore();
        return {
            likeBlockOpacity: score.like === 1 ? 1 : 0.7,
            dislikeBlockOpacity: score.dislike === 1 ? 1 : 0.7,
            hidden: DiscussionData.getHasLoaded() || !type.isSubReply ? '' : 'hidden-obj',
            overflow: type.isReplyToMain ? `style="overflow-x: scroll; overflow-y: hidden"` : '',
            aboveLine: !type.isSubReply || type.isFirstSubReply ? '' : `<hr class="article__line">`,
            beyondLine: type.isSubReply ? '' : '<hr class="article__line">',
            articleClass: type.isSubReply ? 'sub__discussion__article' : 'main__discussion__article',
            replyButtonClass: type.isSubReply ? 'sub__discussion__reply' : '',
            replyButtonMarkup: this._commentData.numOfChildren > 0 ? this._getRepliesButtonMarkup(type, 2) : ''
        }
    }

    _insertSubReply(parentDiscussion, rowMarkup) {
        parentDiscussion.lastElementChild.insertAdjacentHTML('afterend', rowMarkup);
        this.discussion = parentDiscussion.lastElementChild;
    }

    insertDirectly(rowMarkup, after) {
        const main = document.querySelector('main');
        const el = main.lastElementChild ?? main;
        el.insertAdjacentHTML(after, rowMarkup);
        this.discussion = main.lastElementChild.previousElementSibling;
    }

    _generateRowMarkup(options) {
        const d = this._commentData;

        return `<article id="post-${d.commentId ?? DiscussionData.getLastId()}" class="discussion__post ${options.articleClass} 
                    ${options.hidden}"
                        ${options.overflow}>
             <div class="discussion__row">
                ${options.aboveLine}
                <div class="discussion__row-body">
                    <div class="discussion__avatar">
                    <svg class="avatar"><use href="${result}#profile5"></use></svg>
                    </div>
                    <div class="discussion__body">
                    <div class="discussion__metadata">
                        <div class="metadata__account">
                            <span class="nickname">${d.user.username}</span><span class="points">3000</span>
                        </div>
                        <div class="metadata__post-time">${d.commentDate ?? d.date}</div>
                    </div>
                    <div class="discussion__content">
                        <div class="discussion__opinion">${d.description}</div>
                    <nav class="discussion__menu">
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
                                <p id="dislike">${d.sumDisLike}</p> <img class="score__image" src="${dislikeImage}" alt="dislike">
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

        console.log("TYPE");
        console.log(type);

        return `<div class="reply replies__block">
                <button class="reply__button reply__button-replies">${numReplies} Replies</button>
                <img class="replies__icon" src="${showReplies}" alt="List reply icon">
                </div>`
    }

    // If parent node of the new article has 'Replies ...' button, then increment value by one,
    // otherwise use repliesButtonMarkup to generate 'Reply 1' button and attach listener to it.
    _processParent(type) {

        // Show replies of the parent node if they were hidden
        if (DiscussionData.getHasLoaded())
            this._processRepliesListView(this._parentDiscussion, (el) => el.classList?.remove('hidden-obj'));


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

        const childDiscussions = parentDiscussion.querySelectorAll(':scope > .discussion__post');
        childDiscussions.forEach(el => {
            if (!el.classList.contains('form__article')) task(el);
        })
    }

    addReplyListener() {
        this.discussion.querySelector('.reply__block')
            .addEventListener('click', this._handleReply.bind(this));
    }

    addRepliesListenerForLoadedData() {
        this.discussion.querySelector('.replies__block')?.addEventListener('click', this._handleRepliesList.bind(this));
    }

    addRepliesListenerForNew() {
        const repliesButton = this._parentDiscussion.querySelector('.replies__block');
        if (repliesButton === null || repliesButton?.getAttribute('hasEvent') === 'true')
            return;

        repliesButton.setAttribute('hasEvent', 'true');
        repliesButton.addEventListener('click', this._handleRepliesList.bind(this));
    }

    _handleReply(e) {
        const parentDiscussionRow = e.target.closest('.discussion__row');
        new DiscussionFormView(parentDiscussionRow);
    }

    _handleRepliesList(e) {
        const article = e.target.closest('.discussion__post');
        const parentId = Number(article.id.slice(-1));
        processCommentsData(parentId).then(() => {
            e.target.parentNode.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
            this._processRepliesListView(article, (el) => el.classList.toggle('hidden-obj'));
        });
    }

    addScoreListener() {
        this.discussion.querySelectorAll('.score__buttons div')
            .forEach(el => el.addEventListener('click', this._handleScoreClick.bind(this)))
    }

    _deletePreviousScoreAndAssignNew(scoreType, selectedScoreText, otherScoreText) {
        if ((scoreType === 'like' && selectedScoreText.id !== 'like') ||
            scoreType === 'dislike' && selectedScoreText.id !== 'dislike') {
            otherScoreText.innerText = (Number(otherScoreText.innerText) - 1) + '';
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';
        }
    }

    _handleScoreClick(e) {

        const selectedScore = e.target.closest('div'); // has id=like/dislike
        const otherScore = selectedScore.previousElementSibling === null
            ? selectedScore.nextElementSibling : selectedScore.previousElementSibling; // has id opposite selectedLike
        const selectedScoreText = selectedScore.querySelector('p');
        const otherScoreText = otherScore.querySelector('p');

        const storageId = selectedScore.closest('.discussion__post').id;
        const scoreType = localStorage.getItem(`likeType-${storageId}`);
        if (scoreType !== null)
            this._deletePreviousScoreAndAssignNew(scoreType, selectedScoreText, otherScoreText);
        else
            selectedScoreText.innerText = (Number(selectedScoreText.innerText) + 1) + '';

        otherScore.style.opacity = 0.7;
        selectedScore.style.opacity = 1.0;
        localStorage.setItem(`likeType-${storageId}`, selectedScoreText.id);
    }
}

export default CommentRow;