import React from "react";


const Home = () =>
{
    
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Implement Name and Subscribers</span>
                <span className="title">Implement</span>
                <form>
                    <input type="name" placeholder="name"/>
                    <input type="subscribers" placeholder="subscibers" />
                </form>
            </div>
        </div>
    );
};

export default Home;