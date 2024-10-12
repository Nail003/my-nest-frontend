import React from "react";
import { LoginBanner } from "../../components/Banners";
import { Page } from "../../components/Containers";
import { LoginForm } from "../../components/Forms";
import { Sidebar } from "../../components/Sidebars";

const Login = () => {
    return (
        <Page>
            <Sidebar>
                <LoginForm />
            </Sidebar>
            <LoginBanner />
        </Page>
    );
};

export default Login;
