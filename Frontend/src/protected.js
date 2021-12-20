import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Protected(props) {
    let history = useHistory()
    let Cmp = props.cmp;
    useEffect(() => {
        if (window.sessionStorage.getItem('status') != "true") {
            history.push("/login");
        }
    }, [])
    return (
        <div>
            <Cmp />
        </div>
    );
}


export default Protected;