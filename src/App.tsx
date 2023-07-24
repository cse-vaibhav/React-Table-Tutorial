import { useState } from "react";
import { BasicTable } from "./components/Table/Basic";
import { ColumnDnd } from "./components/Table/ColumnDnd";
import { ColumnGroupsTable } from "./components/Table/ColumnGroups";
import { ColumnOrderTable } from "./components/Table/ColumnOrdering";

export default function App() {
  const [active, setActive] = useState(0);

  const tables = [
    {
      name: "Basic Table",
      component: <BasicTable />,
    },
    {
      name: "Column Groups Table",
      component: <ColumnGroupsTable />,
    },
    {
      name: "Ordered Column Table",
      component: <ColumnOrderTable />,
    },
    {
      name: "Column Drag'n'Drop",
      component: <ColumnDnd />,
    },
  ];

  return (
    <>
      {tables.map((t, key) => (
        <span onClick={() => setActive(key)} key={key} className={active == key ? "active" : "inactive"}>
          {t.name}
        </span>
      ))}
      {tables[active].component}
    </>
  );
}
