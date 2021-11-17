import React from 'react';
import Layout from "../../layout";
import LabelAdminContainer from "./containers/label-admin";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";

const LabelAdmin = () => <Layout>
    <Helmet>
        <title>CookMate | Admin | Régimes & Saisons</title>
    </Helmet>
    <Container>
        <LabelAdminContainer />
    </Container>
</Layout>;

export default LabelAdmin
