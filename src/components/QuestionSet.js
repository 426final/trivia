import React, { useState } from 'react';
import he from 'he';
import ReactDOM from 'react-dom';
import Question from './Question';
import { Link, useHistory } from "react-router-dom";
import UserProvider from '../providers/UserProvider';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export default function QuestionSet(props) {
    const set = props.data;
    console.log(set);
    set.forEach(question => {
        question.question = he.decode(question.question);
        question.correct_answer = he.decode(question.correct_answer);
        let test = [];
        question.incorrect_answers.map((answer) => {
            test.push(he.decode(answer));
        })
        question.incorrect_answers = test;
        // question.incorrect_answers = question.incorrect_answers.map((answerText) => {
        //     he.decode(answerText);
        // })
    })
    console.log(set);

    let counter = 0;
    let selected_answers = Array(props.data.length).fill("");
    let all_choices = Array(props.data.length).fill(null);

    const history = useHistory();

    const getAnswer = (data, index, answer_choices) => {
        selected_answers[index-1] = data;
        all_choices[index-1] = answer_choices
    }
    
    const submitHandler = () => {
        console.log(selected_answers);
    }

    const object = {
        set: set,
        answers: selected_answers,
        choices: all_choices
    }

    return(
        <div>
            {props.data.map(question => (
                <Question callbackFromParent={getAnswer} shuffled={shuffle([...question.incorrect_answers, question.correct_answer])} data={question} key={counter += 1} id={counter}/>
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