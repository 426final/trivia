import React, {useState} from 'react';
import QuestionSet from '../components/QuestionSet';

export default function Play(props) {
    console.log(props.location.state);
    return(
        <div>
            <QuestionSet data = {props.location.state} />
        </div>
    )
}