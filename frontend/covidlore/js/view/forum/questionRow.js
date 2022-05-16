import CommentRow from "./commentRow";

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
        console.log("CALL question design");
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

}

export default QuestionRow;