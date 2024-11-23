import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const Sidebar = ({ drawerWidth = 280 }) => {
    const { displayName } = useSelector((state) => state.auth);

    return (
        <Box
            component="nav"
            sx={{width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                open
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
                }}
                variant="permanent"
            >
                <Toolbar>
                    <Typography
                        component="div"
                        noWrap
                        variant="h6"
                    >
                        { displayName }
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        ["Enero", "Febrero", "Marzo", "Abril"].map((text) => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>

                                    <Grid container>
                                        <ListItemText primary={ text } />

                                        <ListItemText secondary={ 'Ipsum qui veniam id sunt do.' } />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};