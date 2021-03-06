import React from "react";
import * as Utils from "../utils.js";


function Outcome({outcome, type}){

    let outcomeClass = type === "positive" ? "none" : "critical";
    let sign = type === "positive" ? "+" : "-";
    let list = Object.keys(outcome).reduce((p,v)=>{
        if(outcome[v] === 0){return p;}
        p.push({label:v,value:outcome[v]});
        return p;
    },[]);

    // console.log("Type",type," of outcome", outcome);

    return (
        <div>
            {list.map(o=><span style={{marginLeft:"4px"}} key={o.label}>{Utils.capitalize(o.label)} <span className={`${outcomeClass} data`}>
            {sign+""+o.value}
        </span></span>)}
        </div>
    )
}


function Outcomes({outcomes}) {
    let {positive,negative} = outcomes;
    let error = false;

    if( !Utils.isGood(positive.list) && !Utils.isGood(negative.list) ){
        error=true;
    }

    // console.log("Outcomes",positive,negative);
    return (
        <div>
            <div className="data">Potential outcomes</div>
            {error ? "Nothing really..." : (
                <div>
                    <Outcome type="positive" outcome={positive}/>
                    <Outcome type="negative" outcome={negative}/>
                </div>
            )}
        </div>
    )
}

export default Outcomes;