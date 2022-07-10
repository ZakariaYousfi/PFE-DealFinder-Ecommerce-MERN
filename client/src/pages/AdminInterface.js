
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import  { UserList,CreateUser,UserEdit }  from '../components/UserList';
import { ContactList } from '../components/ContactList';
import { ReportList } from '../components/ReportList';
import { PostList,PostEdit } from "../components/PostList";
import authProvider from './authProvider'; 



const AdminInterface = () => (
    <Admin dataProvider={simpleRestProvider('http://localhost:5000/api')} authProvider={authProvider} >
       <Resource name="users" list={UserList} create = {CreateUser} edit = {UserEdit}/>
       <Resource name="reports" list={ReportList} />
       <Resource name="contacts" list={ContactList} />
       <Resource name="posts" list={PostList} edit = {PostEdit} />
    </Admin>
);

export default AdminInterface;