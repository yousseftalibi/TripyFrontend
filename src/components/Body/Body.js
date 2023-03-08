import { useState } from "react";
import React from "react";
import Trips from "../Trips/Trips";
import Souvenirs from "../Souvenirs/Souvenirs";
import Authentification from "../Authentification/Authentification";
import { useEffect } from "react";
import { useLoggedIn } from "../../shared/stateStore/stateStore";
import { navbarClicked } from "../../shared/stateStore/stateStore";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const Body = () => {
    const [showTrips, setShowTrips] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showSouvenirs, setShowSouvenirs] = useState(false);
    const { loggedIn } = useLoggedIn((state) => ({ loggedIn: state.loggedIn }));
    const { sectionClicked } = navbarClicked((state) => ({ sectionClicked: state.clickedNavBar }));

    useEffect(() => {
        useLoggedIn.getState().setLoggedIn(Cookies.get('loggedIn'));
    }, [Cookies.get('loggedIn')]);

    useEffect(() => {
        if (sectionClicked === 'My-Trips') {
            setShowTrips(true);
            setShowSignup(false);
            setShowSouvenirs(false);
        } else if (sectionClicked === 'Add-Trips') {
            setShowTrips(false);
            setShowSignup(true);
            setShowSouvenirs(false);
        } else if (sectionClicked === 'Souvenirs') {
            setShowTrips(false);
            setShowSignup(false);
            setShowSouvenirs(true);
        }
        else if (sectionClicked === 'Logout') {
            Cookies.remove('loggedIn');
            useLoggedIn.getState().setLoggedIn(false);
        }
    }, [sectionClicked]);



    return (
        <>
            {loggedIn ? (
                <>
                    {!showSignup && !showSouvenirs && <Trips />}
                    {showSignup && <Trips />}
                    {showSouvenirs && <Souvenirs />}
                </>
            ) :
                <Authentification />
            }
        </ >
    );
}
export default Body;