import React from "react";
import IngredientsAdmin from './containers/ingredients-admin'
import Layout from "../../layout";
import SignInPage from '../../global/components/sign-in-page';

export default function IngredientsAdminPage() {
    return <Layout>
        <SignInPage>
            <IngredientsAdmin/>
        </SignInPage>
    </Layout>
}
