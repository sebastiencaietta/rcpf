import React from "react";
import TagsAdmin from './containers/tag-admin';
import Layout from "../../layout";
import RoleRestrictedPage from '../../global/components/role-restricted-page';

export default function TagsAdminPage() {
    return <Layout>
        <RoleRestrictedPage userRole="ROLE_ADMIN">
            <TagsAdmin/>
        </RoleRestrictedPage>
    </Layout>
};
