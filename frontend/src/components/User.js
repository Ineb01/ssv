import { Container, OutlinedInput, InputLabel, Button } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function User(prop) {
    let navigate = useNavigate();
    const [userdata, setUserdata] = useState({});


    if (userdata == {}) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("/users/token/", requestOptions)
            .then(response => {
                if (response.status != 200)
                    throw new Error("login failed!");
                return response.text()
            })
            .then(result => {
                let jwt = JSON.parse(result)
                let access = jwt.access;
                let data = JSON.parse(Buffer.from(access.split(".")[1], "base64").toString())
                prop.setJwt(jwt);
                prop.setUserID(data.user_id);
                navigate("/", { replace: true });
            })
        return (
            <h1>loading</h1>
        );
    }

    return (<h1>{userdata.toString()}</h1>)
}

export default User;
