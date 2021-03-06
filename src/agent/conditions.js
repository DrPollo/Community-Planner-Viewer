import React from "react";
import Agent from "./agent";

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function isGood(l){
    return (Array.isArray(l) && l.length > 0)
}

function Condition(params){
    // console.log("condition",params);

    const {label,severityLevel} = params;
    return(
        <li>
            <span className={`${severityLevel} comma condition`}>
                {capitalize(severityLevel+" "+label)}
            </span>
        </li>
    )
}

function ListConditions({title,value}){

    return (
        <li className="conditions-list">{capitalize(title)+" "}
            <ul className="conditions">
                {value.map( (condition,i)=>(
                    <Condition key={condition.label} {...condition}/>
                ))}
            </ul>
        </li>
    )

}


function Conditions({value}){

    let [conditions,setConditions] = React.useState(false);
    let [temporary,setTemporary] = React.useState(false);
    let [chronic,setChronic] = React.useState(false);
    let [permanent,setPermanent] = React.useState(false);

    React.useEffect(()=> {

        if(!value || conditions){return}
        // console.log("conditions",value);
        setConditions(value);

        let {temporary, chronic, permanent} = value.reduce((partial,condition)=>{

            // console.log("condition",condition);
            switch (condition.duration){
                case "chronic":
                    partial.chronic.push(condition);
                    break;
                case "permanent":
                    partial.permanent.push(condition);
                    break;
                default:
                    partial.temporary.push(condition);
            }

            return partial;

        },{temporary:[], chronic:[], permanent:[]});

        setChronic(chronic);
        setPermanent(permanent);
        setTemporary(temporary);

    });

    return (
        <div className="conditions-box">
            Conditions
            { isGood(conditions) ?(
                <ul className="condition-box-list">
                    {isGood(temporary)?<ListConditions title="temporary" value={temporary}/>:""}
                    {isGood(chronic)?<ListConditions title="chronic" value={chronic}/>:""}
                    {isGood(permanent)?<ListConditions title="permanent" value={permanent}/>:""}
                </ul>
                ) :
                (<ul className="condition-box-list">
                    <li className="conditions-list">
                        All <span className="none conditions-list condition">GOOD</span>!
                    </li>
                </ul>)
            }
        </div>
    )

}


export default Conditions;


