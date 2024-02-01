import React from 'react'
const Field = (props) => {
    return (
        <div className={props.col}>
                <h3 className='label fs-5'>{props.name}</h3>
                <input id={`'${props.id}'`} placeholder={props.placeholder} type="text"/>
        </div>

    )
}

export default Field
