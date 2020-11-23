import React, {useState} from "react";
import {generateUserDocument} from '../firebase';
import { Link, useHistory } from "react-router-dom";
import QuestionSet from "../components/QuestionSet";
import axios from 'axios';

export default function Practice() {
    const [formData, setFormData] = useState({
        questions: "10",
        category: "any",
        difficulty: "any",
        type: "any"
    })
    const [error, setError] = useState(null);
    let output = [];

    const updateFormData = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const history = useHistory();
    const { questions, category, difficulty, type } = formData;

    const handleSubmit = async(e) => {
        e.preventDefault();
        let int = parseInt(formData.questions);
        let url = 'https://opentdb.com/api.php?amount=';
        if (int <= 50 && int >= 1) {
            url += formData.questions;
        } else {
            setError("Questions out of range!");
            return;
        }
        if (formData.category != 'any') {
            url += '&category=' + formData.category;
        }
        if (formData.difficulty != 'any') {
            url += '&difficulty=' + formData.difficulty;
        }
        if(formData.type != 'any') {
            url += '&type=' + formData.type;
        }
        const result = await axios({
            method: 'get',
            url: url 
        })
        let data = await result.data.results;
        output = await data;
        history.push({
            pathname: '/play',
            state: output
        });
    }


    return (
        <div className="params">
            <h1 className="text-3xl mb-3 text-center font-bold">New Practice Session</h1>
            <div className="form-div mt-8">
                <div className="form-border">
                <form className="form">
                {error !== null && <div className = "py-4 bg-red-600 w-full  text-center mb-3">{error}</div>}
                    <label htmlFor="questions">
                        Number of Question (1-50):
                    </label>
                    <input className="my-2 p-2"
                        type = "text"
                        name = "questions"
                        id = "questions"
                        value = {questions}
                        onChange = {e => updateFormData(e)}
                        required
                    />
                    
                    <label>
                        Category:
                    </label>
                    <select className="my-2 p-2"
                        value={category}
                        onChange = {e => updateFormData(e)}
                        name="category"
                        id="category"
                        >
                            <option value="any">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals &amp; Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science &amp; Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                            <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                    <label>
                        Difficulty Level:                  
                    </label>
                    <select className="my-2 p-2"
                        value={difficulty}
                        onChange = {e => updateFormData(e)}
                        name="difficulty"
                        id="difficulty"
                        >
                            <option value="any">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                    </select>
                    <label>
                        Type of Question:                    
                    </label>
                    <select className="my-2 mb-4 p-2"
                        value={type}
                        onChange = {e => updateFormData(e)}
                        name="type"
                        id="type"
                        >
                            <option value="any">Both</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True/False</option>
                    </select>    
                    <button className="button" type="submit" onClick={async e => {
                        await handleSubmit(e);
                    }} >
                        Start Playing
                    </button>
                </form>
                </div>
                
            </div>
        </div>
    );
}