import { BasicTable } from "./components/Table/Basic"
import { ColumnGroupsTable } from "./components/Table/ColumnGroups"

export default function App() {
  return <>
    <h1>Basic Table</h1>
    <BasicTable />

    <h1>Column Groups Table</h1>
    <ColumnGroupsTable />
  </>
}

