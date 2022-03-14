import React from 'react'
import { themes } from '../../themes'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const theme = themes[props.theme]
    const CardStyle = {
        backgroundColor: theme.colors.bg,
        borderColor: theme.colors.border,
    }
    const HeadStyle = {
        color: theme.colors.head,
        fontFamily: `'${theme.font}', sans-serif`,
    }
    const ParaStyle = {
        color: theme.colors.para,
        fontFamily: `'${theme.font}', sans-serif`,
    }
    const ImgStyle = {
        border: (theme['has-av-border']) ? `2px solid ${theme.colors['av-border']}` : 'none'
    }
    return (
        <div ref={ref} className="card" style={CardStyle}>
        <div className='card-av'>
            <img src={props.avatar} alt="avatar" style={ImgStyle} />
        </div>
        <div className='card-details'>
            <p className='card-username' style={ParaStyle}>@{props.usern}</p>
            <h2 style={HeadStyle}>Hey There! I'm <span className='name' style={ParaStyle} >{props.name}</span>!</h2>
            <p className="about" style={ParaStyle}>{(props.details) ? props.details : ""}</p>
        </div>
        </div>
    )
});