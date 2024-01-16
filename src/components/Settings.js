import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';

function Settings() {
    const [selectedDrawer, setSelectedDrawer] = useState('Skater Settings');

    const handleDrawerSelect = (drawer) => {
        setSelectedDrawer(drawer);
    };

    const drawerList = (
        <List>
            {['Skater Settings', 'Account Settings', 'Verify Account'].map((text) => (
    <ListItem button key={text} onClick={() => handleDrawerSelect(text)}>
    <ListItemText primary={text} />
    </ListItem>
    ))}
    </List>
    );
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
            >
                {drawerList}
            </Drawer>
    
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedDrawer === 'Skater Settings' && (
                    <Box>
                        <Typography variant="h5">Skater Settings</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Skater's Team Name"
                            placeholder="Skater's Team Name"
                        />
                    </Box>
                )}
    
                {/* Placeholder for other settings areas */}
                {selectedDrawer === 'Account Settings' && (
                    <Typography variant="h6">Account Settings Placeholder</Typography>
                )}
                {selectedDrawer === 'Verify Account' && (
                    <Typography variant="h6">Verify Account Placeholder</Typography>
                )}
            </Box>
        </Box>
    );
}

export default Settings;

    