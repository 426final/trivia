import React, {useEffect, useState} from 'react';
import Answers from './Answer';

export default function Question(props) {
    const info = props.data;
    const cat = info.category;
    const type = info.type;
    const diff = info.difficulty;
    const ques = info.question;
    const inc = info.incorrect_answers;
    const cor = info.correct_answer;
    const key = props.id;
    const answers = props.shuffled;
    const [selected, setSelected] = useState('');
    let divs = [];

    const sendSelected = () => {
        props.callbackFromParent(selected, key, answers);
    }

    useEffect(() => {
        sendSelected();
    })

    answers.forEach((text, index) => {
        if (text == selected) {
            divs.push(<button key={index} className="selected answer" onClick={() => {
                setSelected(text);
            }}>
                {text}
            </button>)
        } else {
            divs.push(<button key={index} className="answer" onClick={() => {
                setSelected(text);
            }}>
                {text}
            </button>)
        }
    })
    return (
        <div className="question" category={cat} type={type} difficulty={diff} id={key}>
            <h4>{ques}</h4>
            <div className="options">
                {divs.map((div) => (div))}

            </div>
        </div>
    )
}