import result from "../../../img/profiles/result.svg";
import talkIcon from "../../../img/talk-icon.png";
import likeImage from "../../../img/like.png";
import dislikeImage from "../../../img/dislike.png";
import DiscussionFormView from "./discussionFormView";
import DiscussionData from "../../model/DiscussionData";
import showReplies from "../../../img/show-replies.png";

class DiscussionRowView {

    constructor(parentDiscussion, replyText) {
        this._parentDiscussion = parentDiscussion;
        this._replyText = replyText;
        this._isQuestionPost = Number(DiscussionData.getLastId()) === 0;

        this._types = this._getRowMarkupTypes();
        this._discussion = this._createArticle();
    }

    _getRowMarkupTypes() {
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

    _getRowMarkupDesignOption() {
        const types = this._types;
        let likeValue = 0;
        let dislikeValue = 0;
        const likeType = localStorage.getItem(`likeType-post-${DiscussionData.getLastId()}`);
        if (likeType !== null)
            if (likeType === 'like')
                likeValue = 1;
            else
                dislikeValue = 1;

        if (this._isQuestionPost) {
            return {
                likeValue: likeValue,
                dislikeValue: dislikeValue,
                likeBlockOpacity: likeValue === 1 ? 1 : 0.7,
                dislikeBlockOpacity: dislikeValue === 1 ? 1 : 0.7,
                hidden: '',
                overflow: '',
                aboveLine: '',
                beyondLine: '<hr class="article__line__big">',
                articleClass: 'question__article',
                replyButtonClass: ''
            }
        }

        return {
            likeValue: likeValue,
            dislikeValue: dislikeValue,
            likeBlockOpacity: likeValue === 1 ? 1 : 0.7,
            dislikeBlockOpacity: dislikeValue === 1 ? 1 : 0.7,
            hidden: DiscussionData.getHasLoaded() || !types.isSubReply ? '' : 'hidden-obj',
            overflow: types.isReplyToMain ? `style="overflow-x: scroll; overflow-y: hidden"` : '',
            aboveLine: !types.isSubReply || types.isFirstSubReply ? '' : `<hr class="article__line">`,
            beyondLine: types.isSubReply ? '' : '<hr class="article__line">',
            articleClass: types.isSubReply ? 'sub__discussion__article' : 'main__discussion__article',
            replyButtonClass: types.isSubReply ? 'sub__discussion__reply' : ''
        }
    }

    _createArticle() {
        const rowMarkup = this._generateRowMarkup(this._replyText);
        if (!this._types.isSubReply || this._isQuestionPost)
            return this._insertDirectReplyMarkupAndRetrieveArticle(rowMarkup);
        else {
            this._processParent();
            return this._insertSubReplyMarkupAndRetrieveArticle(this._parentDiscussion, rowMarkup);
        }
    }

    _generateRowMarkup(replyText) {
        const options = this._getRowMarkupDesignOption();

        return `<article id="post-${DiscussionData.getLastId()}" class="discussion__post ${options.articleClass} 
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
                            <span class="nickname">NewUser</span><span class="points">3000</span>
                        </div>
                        <div class="metadata__post-time">10 d</div>
                    </div>
                    <div class="discussion__content">
                        <div class="discussion__opinion">${replyText}</div>
                    <nav class="discussion__menu">
                        <div class="reply reply__block">
                            <img class="reply__icon" src="${talkIcon}" alt="Reply icon">
                            <button class="reply__button reply__button-reply ${options.replyButtonClass}">Reply</button>
                        </div>
                        <div class="like__buttons">
                            <div id="like" style="opacity: ${options.likeBlockOpacity}">
                                <p>${options.likeValue}</p> <img class="like__image" src="${likeImage}" alt="like">
                            </div>
                            <div id="dislike" style="opacity: ${options.dislikeBlockOpacity}">
                                <p>${options.dislikeValue}</p> <img class="like__image" src="${dislikeImage}" alt="dislike">
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

    _insertSubReplyMarkupAndRetrieveArticle(parentDiscussion, rowMarkup) {
        parentDiscussion.lastElementChild.insertAdjacentHTML('afterend', rowMarkup);
        return parentDiscussion.lastElementChild;
    }

    _insertDirectReplyMarkupAndRetrieveArticle(rowMarkup) {
        const main = document.querySelector('main');
        if (this._isQuestionPost)
            main.insertAdjacentHTML('afterbegin', rowMarkup);
        else
            main.lastElementChild.insertAdjacentHTML('afterend', rowMarkup);
        return main.lastElementChild.previousElementSibling;
    }

    // If parent node of the new article has 'Replies ...' button, then increment value by one,
    // otherwise use repliesButtonMarkup to generate 'Reply 1' button and attach listener to it.
    _processParent() {

        if (DiscussionData.getHasLoaded()) {
            // Show replies of the parent node if they were hidden
            this._processRepliesListView(this._parentDiscussion, (el) => el.classList?.remove('hidden-obj'));
        }

        const repliesButton = this._parentDiscussion.querySelector('.reply__button-replies');

        if (repliesButton !== null) {
            repliesButton.innerText = (Number(repliesButton.innerText[0]) + 1) + " Replies";
        } else {

            const repliesButtonMarkup =
                `<div class="reply replies__block">
                <button class="reply__button reply__button-replies ${this._types.isFirstSubReply ? '' : 'sub__discussion__reply'}">1 Reply</button>
                <img class="replies__icon" src="${showReplies}" alt="List reply icon">
            </div>`;

            this._parentDiscussion.querySelector('.reply__block').insertAdjacentHTML('afterend', repliesButtonMarkup);
            this.addRepliesListener();
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
        this._discussion.querySelector('.reply__block')
            .addEventListener('click', this._handleReply.bind(this));
    }

    addRepliesListener() {
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

        e.target.parentNode.querySelector('.replies__icon').classList.toggle('rotate__replies__icon');
        this._processRepliesListView(e.target.closest('.discussion__post'), (el) => el.classList.toggle('hidden-obj'));
    }

    addLikesListener() {
        document.querySelectorAll('.like__buttons div').forEach(el => el.addEventListener('click', this._handleLikesClick))
    }

    _handleLikesClick(e) {

        const selectedLike = e.target.closest('div'); // has id=like/dislike
        const otherLike = selectedLike.previousElementSibling === null
            ? selectedLike.nextElementSibling : selectedLike.previousElementSibling; // has id opposite selectedLike
        const selectedLikeText = selectedLike.querySelector('p');
        const otherLikeText = otherLike.querySelector('p');

        const storageId = selectedLike.closest('.discussion__post').id;

        const likeType = localStorage.getItem(`likeType-${storageId}`);
        if (likeType !== null) {
            if ((likeType === 'like' && selectedLike.id !== 'like') ||
                likeType === 'dislike' && selectedLike.id !== 'dislike') {
                otherLikeText.innerText = (Number(otherLikeText.innerText) - 1) + '';
                selectedLikeText.innerText = (Number(selectedLikeText.innerText) + 1) + '';
            }
        } else {
            selectedLikeText.innerText = (Number(selectedLikeText.innerText) + 1) + '';
        }

        otherLike.style.opacity = 0.7;
        selectedLike.style.opacity = 1.0;
        localStorage.setItem(`likeType-${storageId}`, selectedLike.id);
    }
}

export default DiscussionRowView;