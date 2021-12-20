import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout(props) {
    let Cmp = props.cmp;
    const history = useHistory()
    window.sessionStorage.clear();
    history.push("/login")

    return (
        <>
            <Cmp />
        </>
    )
}


export default Logout;