import React from "react";
import TagsAdmin from './containers/tag-admin';
import Layout from "../../layout";
import SignInPage from '../../global/components/sign-in-page';

export default function TagsAdminPage() {
    return <Layout>
        <SignInPage>
            <TagsAdmin/>
        </SignInPage>
    </Layout>
};
