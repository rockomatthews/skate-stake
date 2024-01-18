import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function Settings() {
    const theme = useTheme();
    const [selectedDrawer, setSelectedDrawer] = useState('Skater Settings');
    const [logo, setLogo] = useState(null); // State to store the logo URL
    const [uploading, setUploading] = useState(false);

    const handleDrawerSelect = (drawer) => {
        setSelectedDrawer(drawer);
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const storage = getStorage();
        const storageRef = ref(storage, `logos/${file.name}`);
        setUploading(true);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            setLogo(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
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

    
    // Adjust these values based on your header and tabs height
    const headerHeight = 64; // Example value for header height
    const tabsHeight = 48; // Example value for tabs height


    return (
        <Box
            sx={{
                display: 'flex',
                pt: `${headerHeight + tabsHeight}px`,
                paddingTop: 3,
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    width: 200,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 160,
                        boxSizing: 'border-box',
                        top: `${headerHeight + 100 + tabsHeight}px`, // Adjust top position
                        left: 300,
                        height: '160px' // Adjust height
                     }
                }}
            >
                {drawerList}
            </Drawer>
    
            <Box component="main" sx={{ flexGrow: .25, p: 3 }}>
                {selectedDrawer === 'Skater Settings' && (
                    <Box>
                        <Typography variant="h5" sx={{ pt: 0 }}>Skater Settings</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            placeholder="Skaters' Team Name"
                            InputLabelProps={{ style: { color: theme.palette.text.light } }} // Label color
                            InputProps={{
                                style: {
                                    color: theme.palette.text.dark, // Text color
                                    backgroundColor: theme.palette.primary.white, // Background color
                                    borderColor: theme.palette.primary.white, // Border color
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: theme.palette.primary.white },
                                    '&:hover fieldset': { borderColor: theme.palette.primary.yellow },
                                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.yellow },
                                },
                            }}
                        />
                         <Box sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Box sx={{ width: 150, height: 150, border: '1px dashed grey', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {logo ? (
                                    <img src={logo} alt="Team Logo" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                ) : (
                                    <Typography sx={{ color: theme.palette.primary.white, fontSize: '2rem' }}>?</Typography>
                                )}
                                <Button
                                    component="label"
                                    sx={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: 0, 
                                        color: theme.palette.primary.white 
                                    }}
                                >
                                    <EditIcon />
                                    <Typography variant="body2" sx={{ display: 'block' }}>Edit Logo</Typography>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileSelect}
                                        disabled={uploading}
                                    />
                                </Button>
                            </Box>
                        </Box>
                        
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