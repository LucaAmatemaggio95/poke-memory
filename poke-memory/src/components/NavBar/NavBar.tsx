import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react';

const NavBar:React.FC = () => {
    return (
        <AppBar elevation={0} position="relative">
            <Toolbar>
                <Typography variant="h6">Poke-memory</Typography>
            </Toolbar>
        </AppBar>
    )
    }

export default NavBar