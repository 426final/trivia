import React, {useState} from 'react';
import QuestionSet from '../components/QuestionSet';

export default function Play(props) {

    return(
        <div>
            <QuestionSet data = {props.location.state} />
        </div>
    )
}