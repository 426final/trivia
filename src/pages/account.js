import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { getSaved} from "../firebase";
import { useHistory } from 'react-router-dom';
import { deleteUser } from "../firebase";
import Answer from '../components/Answer';
import Autocomplete from '../components/Autocomplete';

const Account = () => {
    useContext(UserContext);
   
    const history = useHistory();
    const [saved, setSaved] = useState([]);
    const [all, setAll] = useState([]);
    const [bool, setBool] = useState(true);
    const {user, loaded} = useContext(UserContext);
    const [searchCheck, setSearchCheck] = useState(false);
    
    let search = <div></div>;

    const loadHandler = async () => {
        let test = [];
        
        await getSaved().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                test.push({data: doc.data(), id: doc.id, isNew: false});
            });
            setSaved([...test]);
            setAll([...test]);
        });
        setSearchCheck(true);
        setBool(false);
    }
  
    
    if (!loaded || user==null) {
        return <div className="loading"><span>Loading...</span></div>;
    }
  

    const {email} = user;
 
    const deleteAccountHandler =  () => {
        deleteUser();
    }

    
    let divs = [];
    let suggest = [];
    if (saved.length == 0 && bool) {
        divs = '';
    } else if (saved.length == 0) {
        divs = <div><h4>No results found.</h4></div>
    } else {
        divs = [];
        divs = saved.map((obj, index) => (
            <Answer data={obj.data} selected={obj.data.selected} choices={obj.data.choices} key={obj.id} qid={obj.id} id={index} isNew={obj.isNew}/>
        ));
        all.forEach((obj) => {
            suggest.push(obj.data.question);
        });
    }

    const getQuery = (stateVar) => {
        let query = stateVar.userInput;
        let returnval = [];

        all.forEach((question) => {
            if (question.data.question.toLowerCase().includes(query.toLowerCase())) {
                returnval.push(question);
            }
        })
        setSaved([...returnval]);
    }

    if (searchCheck) {
        search = <Autocomplete callbackFromParent={getQuery} suggestions={suggest} />
    } 
    return (

        <div className="account">
            <h1 className="account-title">Account</h1>
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
                <h2>Saved Questions</h2> 
                <div>
                    <button className="button load-saved-btn" onClick={async (event) => {
                        await loadHandler(event);
                    }}>Load Saved</button>
                </div>
                {search}
                <div className="loaded-questions">
                    {divs}
                </div>
            </div>
        </div>
      ) 
  
};

export default Account;
