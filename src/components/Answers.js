import React from 'react';

export default function Answers(props) {
    const cor = props.cor;
    const inc = props.inc;
    const type = props.type;
    const key = "1";
    console.log(key);
    if (type === "boolean") {
        return (
            <div className="answers">
                <input name={key} type="radio" value="true" /> True
                <input name={key} type="radio" value="false" /> False
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}