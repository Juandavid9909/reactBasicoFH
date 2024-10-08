import { Route, Routes } from "react-router-dom";

import { HeroesRoutes } from "../heroes";
import { LoginPage } from "../auth";
import { PrivateRoute } from "../heroes/routes/PrivateRoute";
import { PublicRoute } from "../heroes/routes/PublicRoute";

export const AppRouter = () => {
    return (
        <Routes>
            {/* <Route path="login/*" element={{ elementos }}></Route> */}
            <Route path="login" element={
                <PublicRoute>
                    <LoginPage />

                    {/* <Routes>
                        <Route path="/*" element={ <LoginPage /> } />
                    </Routes> */}
                </PublicRoute>
            } />

            <Route path="/*" element={
                <PrivateRoute>
                    <HeroesRoutes />
                </PrivateRoute>
            } />

            <Route path="/*" element={ <HeroesRoutes /> } />
        </Routes>
    );
}