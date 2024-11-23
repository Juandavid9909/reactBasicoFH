import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth = 280 }) => {
    const { displayName } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.journal);

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
                        notes.map((note) => (
                            <SidebarItem
                                key={ note.id }
                                { ...note }
                            />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};