import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth, getSaved} from "../firebase";
import { useHistory } from 'react-router-dom';
import { deleteUser } from "../firebase";


const Account = () => {
    const {user, loaded} = useContext(UserContext);
    const history = useHistory();
    // const [saved, setSaved] = useState(null);
    
    // useEffect(() => {
    //     const response = async () => {
    //         console.log(loaded);
    //         const result = await getSaved();
    //         console.log(result);
    //     }
    //     response();
    // }, []);

    if (user == null) {
        return <div></div>
    } 

    const {email} = user;
 
    const deleteAccountHandler =  () => {
        deleteUser();
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
                <button onClick={() => {
                    getSaved().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, " => ", doc.data());
                        });
                    });;
                }}>Load Saved</button>
            </div>
        </div>

        // <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        //   <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        //     <div
        //       style={{
        //         // background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
        //         backgroundSize: "cover",
        //         height: "200px",
        //         width: "200px"
        //       }}
        //       className="border border-blue-300"
        //     ></div>
        //     <div className = "md:pl-4">
        //     {/* <h2 className = "text-2xl font-semibold">{displayName}</h2> */}
        //     <h3 className = "italic">{email}</h3>
        //     </div>
        //   </div>
        // </div>
      ) 
  

  
};

export default Account;
