import React from 'react';

const LogActivityCard = ({ log, role }) => {
    return (
        <>
            <div className='flex-row-left-start full-width'>
                <div className='lists-card--info gray shadow-5px size-16px margin-10px-V inter radius-15px white-bg full-width flex-row-left-start2col'>
                    <div className={`width-${role ? '25' : '30'}-100`} style={{ margin: '2px 5px' }}>
                        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Name: </span>{log.user.name}
                    </div>
                    {role &&
                        <div className={`width-10-100 orange`} style={{ margin: '2px 5px' }}>
                            <span className='lists-card--info--disc--hide margin-6px-H font-bold gray'>Role: </span>{log.user.role.toUpperCase()}
                        </div>
                    }
                    <div className={`width-${role ? '45' : '50'}-100`} style={{ margin: '2px 5px' }}>
                        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Action: </span>{log.action}
                    </div>
                    <div className={`width-20-100`} style={{ margin: '2px 5px' }}>
                        <span className='lists-card--info--disc--hide margin-6px-H font-bold'>Time stamp: </span>{new Date(log.createdAt.toLocaleString("en-US", { timeZone: "Africa/Cairo" })).toLocaleString("en-US", {
                            timeZone: "Africa/Cairo",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogActivityCard;