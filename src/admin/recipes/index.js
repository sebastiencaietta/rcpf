import React from "react";
import AdminRecipeList from "./index/recipe-list";
import RoleRestrictedPage from '../../global/components/role-restricted-page';
import Layout from "../../layout";

export default function RecipesAdmin() {
    return <Layout>
        <RoleRestrictedPage userRole="ROLE_ADMIN">
            <AdminRecipeList />
        </RoleRestrictedPage>
    </Layout>
}
