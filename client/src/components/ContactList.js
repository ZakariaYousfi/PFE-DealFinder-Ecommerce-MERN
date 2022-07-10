import {
    List, Filter, Datagrid,
    TextField, TextInput, EmailField,
} from 'react-admin';



export const ContactList = (props) => {
    return (
        <List {...props} filters={<ContactFilter />} >
            <Datagrid>
                <TextField source="id" />
                <TextField source="contactName" />
                <EmailField source="contactEmail" />
                <TextField source="contactBody" />
            </Datagrid>
        </List>
    )
}

const ContactFilter = (props) => (
    <Filter {...props}>
        <TextInput label="contactName" source="ContactName" />
        <TextInput label="contactEmail" source="contactEmail" />
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)



