import React from 'react';

let What = () => {
    const activities = ['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4'];

        return (
        <>
        <label htmlFor="what">Activities</label>
        <br/>
        <br/>
        {activities.map(
            (activity, index) => (
                <>
                <label key={index} htmlFor={'what-$(index)'}>
                <input type="checkbox" id={'what-$(index)'} />
                    {activity}
                <br />
                </label>
                <br/>
                </>
        
            )
        )
          
        
        }
        
        <br/>   
        </>
    )

}

export default What;