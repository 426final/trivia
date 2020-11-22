import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth, getSaved} from "../firebase";
import { useHistory } from 'react-router-dom';
import { deleteUser } from "../firebase";
import Answer from '../components/Answer';


const Account = () => {
    const {user, loaded} = useContext(UserContext);
    const history = useHistory();
    const [saved, setSaved] = useState([]);

    if (user == null) {
        return <div></div>
    } 

    const {email} = user;
 
    const deleteAccountHandler =  () => {
        deleteUser();
    }

    const loadHandler = async () => {
        let test = [];
        await getSaved().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                test.push({data: doc.data(), id: doc.id});
            });
        });;
        setSaved(test);
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
                <button className="button" onClick={async () => {
                    await loadHandler();
                }}>Load Saved</button>
                <div className="loaded-questions">
                    {saved.map((obj, index) => (
                        <Answer data={obj.data} selected={obj.data.selected} choices={obj.data.choices} key={index} qid={obj.id} id={index} isNew={false}/>
                    ))}
                </div>
            </div>
        </div>
      ) 
  
};

export default Account;
