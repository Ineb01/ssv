import { Container, OutlinedInput, InputLabel, Button, InputAdornment, IconButton, FormControl, Alert, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

function Login(prop) {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
        error: false
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
            {values.error?<Alert severity="error">Enter a correct Username and Password</Alert>:<></>}
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                    id="username"
                    style={{ width: '96%', margin: '2%' }}
                    onChange={handleChange('username')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    style={{ width: '96%', margin: '2%' }}
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
                style={{ width: '96%', margin: '2%' }}
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
                            localStorage.setItem('jwt', result);
                            navigate("/", { replace: true });
                        })
                        .catch(error => {
                            console.log('error', error);
                            setValues({...values, error:true});
                        });
                }}
            >
                Login
            </Button>
            <Link to={"/register"}><Typography style={{ width: '96%', margin: '2%' }}>Don't have an account?</Typography></Link>
        </Container>
    );
}

export default Login;
