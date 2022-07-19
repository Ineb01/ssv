import { Container, OutlinedInput, InputLabel, Button, InputAdornment, IconButton, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";    

function Login(prop) {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '20vh' }}>

            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                    id="username"
                    style={{ width: '100%', margin: '10px' }}
                    onChange={handleChange('username')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    style={{ width: '100%', margin: '10px' }}
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    } />
            </FormControl>
            <Button
                style={{ width: '100%', margin: '10px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                    console.log(values);
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify(values);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("/users/token/", requestOptions)
                        .then(response => {
                            if(response.status != 200)
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
                        .catch(error => console.log('error', error));
                }}
            >
                Login
            </Button>
        </Container>
    );
}

export default Login;
