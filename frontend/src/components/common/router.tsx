import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
} from "react-router-dom";
import Home from "../../pages/Home";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<div>404</div>} element={<Home />}>
        </Route>
    )
);

export default routes;