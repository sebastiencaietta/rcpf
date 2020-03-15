import React from "react";
import IngredientsAdmin from './containers/ingredients-admin'
import Layout from "../../layout";
import {requiresLogin} from "../../global/components/requires-login";

export default function IngredientsAdminPage() {
    const ProtectedIngredientsAdmin = requiresLogin(IngredientsAdmin);

    return <Layout><ProtectedIngredientsAdmin/></Layout>
}
