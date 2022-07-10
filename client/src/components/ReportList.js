import { List, Filter, Datagrid, TextField, TextInput, } from 'react-admin';



export const ReportList = (props) => {
    return (
        <List {...props} filters={<ReportFilter />} perPage={25} >
            <Datagrid>
                <TextField source="id" />
                <TextField source="reportedData" />
                <TextField source="reportedDataId" />
                <TextField source="reportBody" />
            </Datagrid>
        </List>
    )
}

const ReportFilter = (props) => (
    <Filter {...props}>
        <TextInput label="reportedData" source="reportedData" />
        <TextInput label="reportedDataId" source="reportedDataId" />
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)
