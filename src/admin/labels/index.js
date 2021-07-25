import React from 'react';
import Layout from "../../layout";
import LabelAdminContainer from "./containers/label-admin";
import {Helmet} from "react-helmet-async";

const LabelAdmin = () => <Layout>
    <Helmet>
        <title>CookMate | Admin | Régimes & Saisons</title>
    </Helmet>
    <LabelAdminContainer />
</Layout>;

export default LabelAdmin
