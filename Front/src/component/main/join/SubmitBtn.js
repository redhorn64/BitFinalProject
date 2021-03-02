import React from "react";
import ReactDOM from "react-dom";
import useRipple from "useripple";

import './SubmitBtn.css'

function SubmitBtn() {
    const [addRipple, ripples] = useRipple({ background: "orange" })

    return (
        <div className="Example" onClick={addRipple}>
            회원가입
            {ripples}
        </div>
    )
}

export default SubmitBtn;