import '../styles/account.css';
import React from 'react';
import { Redirect } from "react-router-dom";

const Account = ({ user, setUser }) => {
    if (!user) return <Redirect to="/login"/>
    
    return(
        <div id = "account_page_background">
            <h1>Account Details</h1>
            <p className="account_text">username: {user.name}</p>
            <p className="account_text">email: {user.email}</p>
            <button type="button" onClick={ () => setUser("") } className="logout-button">Logout</button>
        </div>
    )
}

export default Account;