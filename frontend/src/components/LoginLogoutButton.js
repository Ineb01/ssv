import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function LoginLogoutButton(prop) {
    const navigate = useNavigate();
    if (localStorage.getItem('jwt') != null)
        return(<Button color="inherit" onClick={()=>{localStorage.removeItem('jwt');navigate("/");}}>Logout</Button>);
    else
        return(<Button color="inherit" onClick={()=>{navigate("/login");}}>Login</Button>);
}

export default LoginLogoutButton;
