import React, { useState } from 'react';
import Question from './Question';

export default function QuestionSet(props) {
    console.log(props.data);
    let counter = 0;
    return(
        <div>
            {props.data.map(question => (
                <Question data={question} key={counter += 1} id={counter}/>
            ))}
        </div>
    )
}