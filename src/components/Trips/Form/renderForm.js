import React from 'react';
import When from './Steps/When';
import Duration from './Steps/Duration';
import Where from './Steps/Where';
import What from './Steps/What';

const renderForm = (clicked, handleClick, buttonText) => {
    return (
        <>
            {clicked === 0 && (
                <>
                    <p>When ? </p>
                    <When />
                </>
            )}
            {clicked === 1 && (
                <>
                    <p>For how long?</p>
                    <Duration />
                </>
            )}
            {clicked === 2 && (
                <>
                    <p>Where to? </p>
                    <Where />
                </>
            )}
            {clicked === 3 && (
                <>
                    <p>Doing what? </p>
                    <What />
                </>
            )}
            <button type="button" onClick={handleClick}>
                {buttonText}
            </button>
        </>
    );
};

export default renderForm;
