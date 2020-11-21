import React from 'react';

export default function Feedback(props) {
    console.log(props.location.state);
    const set = props.location.state.set;
    const answers = props.location.state.answers;
    let divs = [];
    answers.forEach((text, index) => {
        if (text == set[index].correct_answer) {
           
        }
    })
    return (
        <div></div>
    )
}