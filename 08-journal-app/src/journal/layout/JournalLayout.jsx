import { Box, Toolbar } from "@mui/material";

import { NavBar, Sidebar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        <Box
            className="animate__animated animate__fadeIn animate__faster"
            sx={{ display: "flex" }}
        >
            <NavBar drawerWidth={ drawerWidth } />

            <Sidebar drawerWidth={ drawerWidth } />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Toolbar />
                
                { children }
            </Box>
        </Box>
    );
};