import React from "react";
import { LoginBanner } from "../../components/Banners";
import { Page } from "../../components/Containers";
import { SignupForm } from "../../components/Forms";
import { Sidebar } from "../../components/Sidebars";

const Signup = () => {
    return (
        <Page>
            <Sidebar>
                <SignupForm />
            </Sidebar>
            <LoginBanner />
        </Page>
    );
};

export default Signup;
