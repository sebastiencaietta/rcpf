import React from "react";
import Layout from '../../layout'
import IngredientsAdmin from './containers/ingredients-admin'

export default function IngredientsAdminPage() {
    // const ProtectedIngredientsAdmin = requiresLogin(IngredientsAdmin);

    return <Layout title="Ingredients admin">
        {/*{<ProtectedIngredientsAdmin/>}*/}
        <IngredientsAdmin/>
    </Layout>
}
