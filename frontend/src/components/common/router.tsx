import {
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "../../pages/Home";
import { Layout } from "../Layout/Layout";
import About from "../../pages/About";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import * as reactRouterDom  from "react-router-dom"
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, {Github, Google, Facebook, Apple} from "supertokens-auth-react/recipe/thirdparty";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import ErrorBoundary from "./ErrorBoundary";

SuperTokens.init({
    appInfo: {
        appName: "Auction House",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    Github.init(),
                    // Google.init(),
                    // Facebook.init(),
                    // Apple.init(),
                ]
            }
        }),
        Session.init()
    ]
});

export default function RouteWrapper() {
    return (
        <SuperTokensWrapper>
            <RouterProvider router={router} />
        </SuperTokensWrapper>
    )
}

const router = reactRouterDom.createBrowserRouter(
    reactRouterDom.createRoutesFromElements(
        <Route element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<SessionAuth><About /></SessionAuth>} />
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI])}
        </Route>
    )
);