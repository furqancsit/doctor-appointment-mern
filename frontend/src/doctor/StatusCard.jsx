import React from 'react'

const StatusCard = ({ title, value }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>


        </div>
    )
}

export default StatusCard