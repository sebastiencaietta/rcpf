import React from "react";
import AdminRecipeList from "./index/recipe-list";
import Layout from "../../layout";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";

export default function RecipesAdmin() {
    return <Layout>
        <Helmet>
            <title>CookMate | Admin | Recettes</title>
        </Helmet>
        <Container>
            <AdminRecipeList />
        </Container>
    </Layout>
}
