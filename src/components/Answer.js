import React from 'react';
import {saveQuestion, unsaveQuestion} from '../firebase';
 
export default function Answer(props) {
    const info = props.data;
    const cat = info.category;
    const type = info.type;
    const diff = info.difficulty;
    const ques = info.question;
    const cor = info.correct_answer;
    const key = props.id;
    const choices = props.choices;
    const selected = props.selected;
    const isNew = props.isNew;
    const augmentedQuestion = {
        category: cat,
        type: type,
        difficulty: diff,
        question: ques,
        correct_answer: cor,
        choices: choices,
        selected: selected,
    }

    let conditional = null;
    if (isNew) {
        conditional = <button className='save' onClick={() => {
            saveQuestion(augmentedQuestion);
        }}>Save</button>
    } else {
        conditional = <button className='unsave' onClick={() => {
            unsaveQuestion(props.qid);
            return;
        }}>Unsave</button>
    }

    let divs = [];
    choices.forEach((text, index) => {
        if (text == cor) {
            divs.push(<button key={index} className="correct answer" >
                {text}
            </button>)
        } else if (text !== cor && text == selected) {
            divs.push(<button key={index} className="incorrect answer">
                {text}
            </button>)
        } else {
            divs.push(<button key={index} className="answer">
                {text}
            </button>)
        }
    })
    return (
        <div className="question" category={cat} type={type} difficulty={diff} id={key} qid={props.qid}>
            <div className="content">
                <label>{ques}</label>
                {divs.map((div) => (div))}
            </div>
            {conditional}
        </div>
    )
}