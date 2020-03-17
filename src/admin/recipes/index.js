import React from "react";
import AdminRecipeList from "./index/recipe-list";
import SignUpIfNotAuth from '../../global/components/sign-in-page';
import Layout from "../../layout";

export default function RecipesAdmin() {
    return <Layout>
        <SignUpIfNotAuth>
            <AdminRecipeList />
        </SignUpIfNotAuth>
    </Layout>
}
