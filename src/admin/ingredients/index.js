import React from "react";
import IngredientsAdmin from './containers/ingredients-admin'
import Layout from "../../layout";

export default function IngredientsAdminPage() {
    // const ProtectedIngredientsAdmin = requiresLogin(IngredientsAdmin);

    return <Layout><IngredientsAdmin/></Layout>
}
