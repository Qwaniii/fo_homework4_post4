import React from "react"
import s from "./aboutuser.module.css"

const AboutUser = ({ children, name, exit, about, email, close }) => {
    return(
        <div className={s.container}>
            <div className={s.wrapper}> 
                <div className={s.name}>
                    <div>{name}</div>
                    <div>{about}</div>
                    <div>{email}</div>
                </div>
                <div className={s.children}>{children}</div>
                <div className={s.footer}>
                    <div className={s.close} onClick={() => close()}>Закрыть</div>
                    <div className={s.exit} onClick={() => exit()}>Выйти</div>
                </div>
            </div>
        </div>
    )
}

export default AboutUser