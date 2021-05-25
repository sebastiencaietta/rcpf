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

export default () => <>
    <Route exact path="/" component={RecipeList}/>
    <Route exact path="/recipes/:slug" component={Recipe}/>
    <Route exact path="/login" component={LoginPage} />

    <RoleRestrictedPage exact path="/my-account" userRole="ROLE_USER">
        <MyAccount />
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes/add">
        <AddRecipe/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes">
        <RecipesAdmin/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/recipes/edit/:slug">
        <AddRecipe/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/ingredients/">
        <IngredientsAdmin/>
    </RoleRestrictedPage>
    <RoleRestrictedPage exact path="/admin/tags/">
        <TagsAdmin/>
    </RoleRestrictedPage>
    <Route path="/__/auth/action" component={AuthActions} />
</>

