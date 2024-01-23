import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../AuthContext';

function Settings() {
    const theme = useTheme();
    const { user } = useAuth();
    const firebaseUserId = user?.uid;
    const [selectedDrawer, setSelectedDrawer] = useState('Skater Settings');
    const [logo, setLogo] = useState("https://firebasestorage.googleapis.com/v0/b/skate-stake.appspot.com/o/blankLogo.png?alt=media&token=1a47b77e-adee-4a57-ad25-06677458d727"); // Updated to null initially
    const [uploading, setUploading] = useState(false);


    const handleDrawerSelect = (drawer) => {
        setSelectedDrawer(drawer);
    };

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (firebaseUserId) {
                try {
                    const response = await fetch(`http://localhost:3001/getUserData?firebaseUserId=${firebaseUserId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setLogo(userData.logo);
                    // Other user data can be set here
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [firebaseUserId]);


    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (firebaseUserId) {
            const storage = getStorage();
            const storageRef = ref(storage, `logos/${firebaseUserId}`);

            setUploading(true);

            try {
                const snapshot = await uploadBytes(storageRef, file);
                const url = await getDownloadURL(snapshot.ref);
                setLogo(url);
            
                // Debugging: Log to see if this part is reached with correct data
                console.log("Uploading logo URL to server:", { firebaseUserId, logoUrl: url });
            
                const updateResponse = await fetch('http://localhost:3001/updateUserLogo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firebaseUserId, logoUrl: url })
                });
            
                if (!updateResponse.ok) {
                    throw new Error('Failed to update logo URL in Firestore');
                }
            
                const updateResult = await updateResponse.json();
                console.log("Server response:", updateResult);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setUploading(false);
            }
        } else {
            console.error("User ID is not available");
        }
    };

    const handleSaveSettings = async () => {
        // Function to handle saving all settings
        // This includes uploading the logo and saving the team name
        // Use the logic from handleFileSelect and extend it to include other settings
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
                                <img src={logo} alt="Team Logo" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                <Button
                                    component="label"
                                    sx={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: 0, 
                                        color: theme.palette.primary.white 
                                    }}
                                >
                                    Upload Logo
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileSelect}
                                        disabled={uploading}
                                    />
                                </Button>
                            </Box>
                        </Box>
                        <Button
                            onClick={handleSaveSettings}
                            disabled={uploading}
                            sx={{ backgroundColor: theme.palette.primary.yellow }}
                        >
                            Save Settings
                        </Button>
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