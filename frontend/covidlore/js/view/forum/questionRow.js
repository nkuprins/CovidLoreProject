import CommentRow from "./commentRow";
import {processChangePostScoreRequest} from "../../controller/discussionController";

class QuestionRow extends CommentRow {

    constructor(parentDiscussion, questionData) {
        super(parentDiscussion, questionData, false);
    }

    createQuestionArticle() {
        const rowMarkup = this._generateRowMarkup(this._getRowMarkupDesignOption());
        this.insertDirectly(rowMarkup, 'afterbegin');
    }

    _getRowMarkupDesignOption() {
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

    addQuestionScoreListener() {
        this._discussion.querySelectorAll('.score__buttons div')
            .forEach(el => el.addEventListener('click', this._handleQuestionScoreClick.bind(this)))
    }

    _handleQuestionScoreClick(e) {

        const selectedScore = e.target.closest('div'); // div has id=like/id=dislike
        const selectedScoreText = selectedScore.querySelector('p');
        const questionId = selectedScore.closest('.comment__post').id;
        this.changeScoreOnClick(selectedScore, selectedScoreText, questionId);
        processChangePostScoreRequest(questionId, selectedScoreText.id);
    }

}

export default QuestionRow;