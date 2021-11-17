import React from "react";
import TagsAdmin from './containers/tag-admin';
import Layout from "../../layout";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";

export default function TagsAdminPage() {
    return <Layout>
        <Helmet>
            <title>CookMate | Admin | Tags</title>
        </Helmet>
        <Container>
            <TagsAdmin/>
        </Container>
    </Layout>
};
