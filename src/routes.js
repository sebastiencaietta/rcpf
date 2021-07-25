import React from 'react';
import {Route} from 'react-router-dom';
import RecipeList from "./recipe-list";
import Recipe from './recipe';
import AddRecipe from './admin/recipes/recipe-form';
import RecipesAdmin from './admin/recipes';
import IngredientsAdmin from "./admin/ingredients";
import TagsAdmin from "./admin/tags";
import AuthActions from "./auth/containers/auth-actions";
import LoginPage from "./auth/containers/login-page";
import MyAccount from "./account";
import RoleRestrictedPage from "./global/components/role-restricted-page";
import LabelAdmin from "./admin/labels/";

const Routes = () => <>
    <Route exact path="/" component={RecipeList}/>
    <Route exact path="/recipes/:slug" component={Recipe}/>
    <Route exact path="/login" component={LoginPage} />

    <RoleRestrictedPage exact path="/my-account" userRole="ROLE_USER">
        <MyAccount />
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes/add" userRole="ROLE_ADMIN">
        <AddRecipe/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes" userRole="ROLE_ADMIN">
        <RecipesAdmin/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes/edit/:slug" userRole="ROLE_ADMIN">
        <AddRecipe/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/ingredients/" userRole="ROLE_ADMIN">
        <IngredientsAdmin/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/tags/" userRole="ROLE_ADMIN">
        <TagsAdmin/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/labels/" userRole="ROLE_ADMIN">
        <LabelAdmin/>
    </RoleRestrictedPage>
    <Route path="/__/auth/action" component={AuthActions} />
</>;

export default Routes

