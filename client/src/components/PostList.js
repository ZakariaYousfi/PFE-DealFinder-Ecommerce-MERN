import { List, Filter, Datagrid, TextField, TextInput, EditButton, Edit, SimpleForm } from 'react-admin';



export const PostList = (props) => {
    return (
        <List {...props}  filters={<PostFilter/>} perPage={25} >
            <Datagrid>
                <TextField source="id" />
                <TextField source="posterId" />
                <TextField source="posterName" />
                <TextField source="title"/>
                <TextField source="description"/>
                <TextField source="phonenumber"/>
                <TextField source="tags"/>
                <TextField source="stock"/>
                <TextField source="state"/>
                <TextField source="price"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

const PostFilter = (props) => (
    <Filter {...props}>
    <TextInput label="id" source="id"/>
    <TextInput label="posterId" source="posterId" />
    <TextInput label="posterName" source="posterName" />
    <TextInput label="title" source="title" />
    <TextInput label="description" source="description" />
    <TextInput label="tags" source="tags" />
    <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const PostEdit = (props) => (
    <Edit {...props} >
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="posterName" />
            <TextInput source="title"/>
            <TextInput source="description"/>
            <TextInput source="phonenumber"/>
            <TextInput source="tags"/>
            <TextInput source="stock"/>
            <TextInput source="state"/>
            <TextInput source="price"/>
        </SimpleForm>
    </Edit>
);