import LoginLogoutButton from './LoginLogoutButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';


function Header(prop){
  let theme = useTheme();
    return(<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none",  color: theme.palette.text.primary}}>
              HIP
            </Link>
            </Typography>
            <LoginLogoutButton userData={prop.userData} logout={prop.reset}/>
          </Toolbar>
        </AppBar>
      </Box>);
}


export default Header;