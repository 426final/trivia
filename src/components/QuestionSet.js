import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Question from './Question';
import { Link, useHistory } from "react-router-dom";
import UserProvider from '../providers/UserProvider';

export default function QuestionSet(props) {
    const set = props.data;

    let counter = 0;
    let selected_answers = Array(props.data.length).fill("");

    const history = useHistory();

    const getAnswer = (data, index) => {
        selected_answers[index-1] = data;
        console.log(index, data);
    }
    
    const submitHandler = () => {
        console.log(selected_answers);
    }

    const object = {
        set: set,
        answers: selected_answers
    }

    return(
        <div>
            {props.data.map(question => (
                <Question callbackFromParent={getAnswer} data={question} key={counter += 1} id={counter}/>
            ))}
            <button type="submit" className="button" onClick={() => {
                submitHandler();
                history.push({
                    pathname: '/feedback',
                    state: object
                })
            }}>Submit Answers</button>
        </div>
    )
}