import CommentRow from "./commentRow";

class CommentQuestionRow extends CommentRow {

    constructor(parentDiscussion, questionData) {
        super(parentDiscussion, questionData);
    }

    showQuestionArticle() {
        const rowMarkup = this._generateRowMarkup(this._getRowMarkupCSSOption());
        this.insertDirectly(rowMarkup, 'afterbegin');
    }

    _getRowMarkupCSSOption() {
        const score = this.calculateScore();
        return {
            likeBlockOpacity: score.like === 1 ? 1 : 0.7,
            dislikeBlockOpacity: score.dislike === 1 ? 1 : 0.7,
            overflow: '',
            aboveLine: '',
            beyondLine: '<hr class="article__line__big">',
            articleClass: 'question__article',
            replyButtonClass: '',
            replyButtonMarkup: ''
        }
    }

    addQuestionScoreListener(handler) {
        this.comment.querySelectorAll('.score__buttons div')
            .forEach(el => el.addEventListener('click', function (e) {
                const selectedScore = e.target.closest('div'); // div has id=like/id=dislike
                const selectedScoreText = selectedScore.querySelector('p');
                const questionId = selectedScore.closest('.comment__post').id;
                this.changeScoreOnClick(selectedScore, selectedScoreText, questionId);
                handler(questionId, selectedScoreText.id);
            }.bind(this)))
    }
}

export default CommentQuestionRow;