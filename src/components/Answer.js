import React, {useState} from 'react';
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
            setState(<div className="question" category={cat} type={type} difficulty={diff} id={key} qid={props.qid}>
            <div className="content">
                <h3>{result}</h3>
                <label>{ques}</label>
                <div className="options">
                    {divs.map((div) => (div))}
        
                </div>
                </div>
                <button className='save save-clicked'>Save</button>
            </div>);
        }}>Save</button>
    } else {
        conditional = <button className='unsave' onClick={() => {
            unsaveQuestion(props.qid);
            setState(<div className="question" category={cat} type={type} difficulty={diff} id={key} qid={props.qid}>
            <div className="content">
                <h3>{result}</h3>
                <label>{ques}</label>
                <div className="options">
                    {divs.map((div) => (div))}
        
                </div>
                </div>
                <button className='save save-clicked'>Unsave</button>
            </div>);
            return;
        }}>Unsave</button>
    }    
    
    let result = '';
    if (selected == cor) {
        result = 'Correct!';
    } else if (selected == '') {
        result = 'Unanswered';
    } else {
        result = 'Incorrect';
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


    const [state, setState] = useState(<div className="question" category={cat} type={type} difficulty={diff} id={key} qid={props.qid}>
    <div className="content">
        <h3>{result}</h3>
        <label>{ques}</label>
        <div className="options">
            {divs.map((div) => (div))}

        </div>
        </div>
        {conditional}
    </div>);


   
    


    return (
        <div>{state}</div>
    )
}