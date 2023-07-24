import { BasicTable } from "./components/Table/Basic"
import { ColumnGroupsTable } from "./components/Table/ColumnGroups"
import { ColumnOrderTable } from "./components/Table/ColumnOrdering"


export default function App() {
  const tables = [
    {
      name: "Basic Table",
      component: <BasicTable />
    },
    {
      name: "Column Groups Table",
      component: <ColumnGroupsTable />
    },
    {
      name: "Ordered Column Table",
      component: <ColumnOrderTable />
    }
  ]

  return <>
    {tables.map((t,key) => (
      <div key={key}>
        <h1>{t.name}</h1>
        {t.component}
      </div>      
    ))}
  </>
}

