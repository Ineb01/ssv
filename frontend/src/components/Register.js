import { Container, OutlinedInput, InputLabel, Button, InputAdornment, IconButton, FormControl, Alert, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

function Register(prop) {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        showPassword: false,
        error: null
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
            {values.error!=null?<Alert style={{ width: '88%', margin: '2%' }} severity="error">{values.error}</Alert>:<></>}
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                    id="username"
                    style={{ width: '96%', margin: '2%' }}
                    onChange={handleChange('username')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="first_name">First name</InputLabel>
                <OutlinedInput
                    id="first_name"
                    style={{ width: '96%', margin: '2%' }}
                    onChange={handleChange('first_name')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="last_name">Last name</InputLabel>
                <OutlinedInput
                    id="last_name"
                    style={{ width: '96%', margin: '2%' }}
                    onChange={handleChange('last_name')}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput
                    id="email"
                    style={{ width: '96%', margin: '2%' }}
                    onChange={handleChange('email')}
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

                    let terror=false
                    fetch("/users/", requestOptions)
                        .then(response => {
                            terror = response.status != 201;
                            return response.text()
                        })
                        .then(result => {
                            if(terror)
                                throw new Error(result);
                            else
                                navigate("/", { replace: true });
                        })
                        .catch(error => {
                            let err = JSON.parse(error.message)
                            let key = Object.keys(err)[0]
                            let tex = err[key]
                            setValues({...values, error:`${key}: ${tex}`});
                        });
                }}
            >
                Register
            </Button>
            <Link to={"/login"}><Typography style={{ width: '96%', margin: '2%' }}>Already have an account?</Typography></Link>
        </Container>
    );
}

export default Register;
