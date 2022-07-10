import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';


const LeftNav = () => {
    const uid = useContext(UidContext);
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' exact activeClassName="active-left-nav">
                        <img src="/img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink to='/profile' exact activeClassName="active-left-nav">
                        <img src="/img/icons/user.svg" alt="user" />
                    </NavLink>
                    {
                        uid && (<NavLink to='/chat' exact activeClassName="active-left-nav">
                            <img src="/img/icons/message1.svg" alt="chat" />
                        </NavLink>)
                    }
                    {
                        uid && (<NavLink to='/cart' exact activeClassName="active-left-nav">
                            <img src="/img/icons/addcart.png" alt="cart" />
                        </NavLink>)
                    }
                    <br /><br />
                    <NavLink to="/contact" exact activeClassName="active-left-nav">
                        <div>
                            <img style={{
                                marginLeft: "4px",
                            }} src="/img/icons/report.svg" alt="report" />
                        </div>
                    </NavLink>

                </div>
            </div>
        </div>
    );
};

export default LeftNav;