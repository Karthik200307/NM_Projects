import React, { useContext } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount, token, setToken, userName } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            <h1>Food-24</h1>
            <ul className="navbar-menu">
                <Link to='/' className="active">home</Link>
                <a href='#explore-menu'>menu</a>
                <a href='#app-download'>mobile-app</a>
                <a href='#footer'>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <span className="user-name">{userName}</span>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;