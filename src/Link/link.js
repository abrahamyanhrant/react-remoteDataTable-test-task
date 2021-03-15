import React from "react";
import './link.css'

const RepoLink = ({link}) => {
    return(
        <a href={link} target="_blank" rel="noreferrer">{link}</a>
    )
}

export default RepoLink