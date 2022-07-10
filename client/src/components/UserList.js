import { List, Filter, Datagrid, TextField, TextInput, EmailField, Create, Edit, SimpleForm,EditButton} from 'react-admin';



export const UserList = (props) => {
    return (
        <List {...props}  filters={<UserFilter/>} perPage={25} >
            <Datagrid>
                <TextField source="id" />
                <TextField source="username" />
                <EmailField source="email" />
                <TextField source="bio"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

const UserFilter = (props) => (
    <Filter {...props}>
    <TextInput label="id" source="id"/>
    <TextInput label="username" source="username" />
    <TextInput label="email" source="email" />
    <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const CreateUser = (props) => {
    return (
    <Create title="Create a User" {...props}>
    <SimpleForm>
    <TextInput source="username" />
    <TextInput source="email" />
    <TextInput source="password" />
    <TextInput multiline source="bio" />
    </SimpleForm>
    </Create>
        )
}



export const UserEdit = (props) => (
    <Edit {...props} >
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="username" />
            <TextInput source="bio" />
        </SimpleForm>
    </Edit>
);
