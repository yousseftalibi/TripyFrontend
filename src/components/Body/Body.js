import { useState } from "react";
import React from "react";
import Social from "../Social/Social";
import CleanData from "../Trips/test/test";
import Authentification from "../Authentification/Authentification";
import Trips from "../Trips/Trips";
import Gallery from "../Gallery/Gallery";
import Account from "../Account/Account";
import { useEffect } from "react";
import { useLoggedIn } from "../../shared/stateStore/stateStore";
import { navbarClicked } from "../../shared/stateStore/stateStore";
import "./Body.css";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const Body = () => {
    const [showTrips, setShowTrips] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showSocial, setShowSocial] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showGallery, setShowGallery] = useState(false);

    const { loggedIn } = useLoggedIn((state) => ({ loggedIn: state.loggedIn }));
    const { sectionClicked } = navbarClicked((state) => ({ sectionClicked: state.clickedNavBar }));

    useEffect(() => {
        useLoggedIn.getState().setLoggedIn(Cookies.get('loggedIn'));
    }, [Cookies.get('loggedIn')]);

    useEffect(() => {
        if (sectionClicked === 'Trips') {
            setShowTrips(true);
            setShowSocial(false);
            setShowAccount(false);
            setShowGallery(false);
        } else if (sectionClicked === 'Social') {
            setShowTrips(false);
            setShowSocial(true);
            setShowAccount(false);
            setShowGallery(false);
        } else if (sectionClicked === 'Gallery') {
            setShowTrips(false);
            setShowSocial(false);
            setShowAccount(false);
            setShowGallery(true);
        }
        else if (sectionClicked === 'Account') {
            setShowTrips(false);
            setShowSocial(false);
            setShowAccount(true);
            setShowGallery(false);
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
                    {!showSocial && !showGallery && !showAccount && <Trips />}
                    { !showGallery && !showAccount && showSocial && <Social />}
                    {!showSocial && !showAccount && !showTrips && showGallery && <Gallery />}
                    {!showSocial && !showTrips && !showGallery &&  showAccount && <Account />}
                </>
            ) :
                <Authentification />
            }
        </ >
    );
}
export default Body;