import React, {useState} from 'react';
import Answers from './Answers';


export default function Question(props) {
    const info = props.data;
    const cat = info.category;
    const type = info.type;
    const diff = info.difficulty;
    const ques = info.question;
    const inc = info.incorrect_answers;
    const cor = info.correct_answer;
    const key = props.id;
    const answers = [...inc, cor];
    // console.log(inc);
    // console.log(answers);
    // console.log(answers);
    const [answer, setAnswer] = useState(answers);
    const [selected, setSelected] = useState('');
    let divs = [];
    answer.forEach((text, index) => {
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
            <label>{ques}</label>
            {/* <Answers type={type} cor={cor} inc={inc} key={key}/> */}
            {divs.map((div) => (div))}
        </div>
    )
}