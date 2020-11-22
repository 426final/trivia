import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth, getSaved} from "../firebase";
import { useHistory } from 'react-router-dom';
import { deleteUser } from "../firebase";
import Answer from '../components/Answer';
import Autocomplete from '../components/Autocomplete';


const Account = () => {
    const {user, loaded} = useContext(UserContext);
    const history = useHistory();
    const [saved, setSaved] = useState([]);
    const [all, setAll] = useState([]);
   
    const [bool, setBool] = useState(true);

    if (user == null) {
        return <div></div>
    } 

    const {email} = user;
 
    const deleteAccountHandler =  () => {
        deleteUser();
    }

    const loadHandler = async (event) => {
        event.target.classList.add('display-none');
        let test = [];
        
        await getSaved().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                test.push({data: doc.data(), id: doc.id, isNew: false});
            });
            setSaved(test);
            setAll(test);
        });;
        setBool(false);
    }
    
    let divs = [];
    let suggest = [];
    if (saved.length == 0 && bool) {
        divs = '';
    } else if (saved.length == 0) {
        divs = <div><h4>No questions saved.</h4></div>
    } else {
        divs = saved.map((obj, index) => (
            <Answer data={obj.data} selected={obj.data.selected} choices={obj.data.choices} key={index} qid={obj.id} id={index} isNew={obj.isNew}/>
        ));
        all.map((obj) => {
            suggest.push(obj.data.question);
        });
    }

    const getQuery = (stateVar) => {
        let query = stateVar.userInput;
        console.log(query);
        let returnval = [];

        all.forEach((question) => {
            if (question.data.question.includes(query)) {
                returnval.push(question);
            }
        })
        setSaved(returnval);
    }

    return (

        <div className="account">
            <h1>Account</h1>
            <div className="user-info">
                <h2>User Information</h2> 
                <div className="info-container">
                    <div className="user-field info-item">Email: {email}</div>
                    <button className="info-item button" onClick={event => {history.push('/password-reset')}}>Change Password</button>
                    <button className="info-item button" onClick={() => {
                        deleteAccountHandler();
                        history.push('/');
                        }} >Delete Account</button>
                </div>
            </div>
            <div className="saved-questions">
                <button className="button" onClick={async (event) => {
                    await loadHandler(event);
                }}>Load Saved</button>
                <Autocomplete callbackFromParent={getQuery} suggestions={suggest}/>
                <div className="loaded-questions">
                    {divs}
                </div>
            </div>
        </div>
      ) 
  
};

export default Account;
