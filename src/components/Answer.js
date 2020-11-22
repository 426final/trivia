import React from 'react';

export default function Answer(props) {
    const info = props.data;
    const cat = info.category;
    const type = info.type;
    const diff = info.difficulty;
    const ques = info.question;
    const inc = info.incorrect_answers;
    const cor = info.correct_answer;
    const key = props.id;
    const choices = props.choices;
    const selected = props.selected;

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
        <div className="question" category={cat} type={type} difficulty={diff} id={key}>
            <div className="content">
                <label>{ques}</label>
                {divs.map((div) => (div))}
            </div>
            <button className='save' onClick={(info) => {
                
            }}>Save</button>
        </div>
    )
}