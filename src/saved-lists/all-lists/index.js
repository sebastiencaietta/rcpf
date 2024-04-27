import React from "react";
import Layout from "../../layout";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";
import {ProviderSuccessSnackbar} from "../../layout/use-success-snackbar";
import AllLists from "./components/all-lists";

const SavedListsPage = () => {

    return <Layout>
        <Helmet>
            <title>CookMate | Mes listes de recettes</title>
        </Helmet>

        <Container>
            <ProviderSuccessSnackbar>
                <AllLists />
            </ProviderSuccessSnackbar>
        </Container>
    </Layout>;
};

export default SavedListsPage;
