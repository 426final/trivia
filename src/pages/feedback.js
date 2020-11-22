import React from 'react';
import Answer from '../components/Answer';

export default function Feedback(props) {
    const set = props.location.state.set;
    const answers = props.location.state.answers;
    const choices = props.location.state.choices;
    let divs = [];
    let counter = 0;

    return (
        <div className="question-page">
            <h1>Results</h1>
            <div className="question-set">
                {set.map((question, index) => (
                    <Answer data={question} selected={answers[index]} choices={choices[index]} key={counter += 1} id={counter} isNew={true}/>
                ))}
            </div>
        </div>
        
    )
}