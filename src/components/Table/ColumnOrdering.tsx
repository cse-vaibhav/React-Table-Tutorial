import { ColumnDef, ColumnOrderState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"

//{{{ Dummy Data
type Person = {
    firstName: string,
    lastName: string,
    age: number,
    visits: number,
    status: string,
    progress: number
  }
  
  const defaultData: Person[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'Vaibhav',
      lastName: 'Jain',
      age: 20,
      visits: 200,
      status: 'In Relationship',
      progress: 80,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]//}}}
  
  //{{{ Columns
  const columns: ColumnDef<Person>[] = [
    {
        header: "Name",
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: "firstName",
                cell: info => info.getValue(),
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.lastName,
                id: "lastName",
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id
            }
        ]
    },
    {
        header: "Info",
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: "age",
                header: () => "Age",
                footer: props => props.column.id,
            },
            {
                header: "More Info",
                columns: [
                    {
                        accessorKey: "visits",
                        header: () => <span>Visits</span>,
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: "status",
                        header: () => <span>Status</span>,
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: "progress",
                        header: () => <span>Progress</span>,
                        footer: props => props.column.id,
                    },
                ]
            }
        ]
    }
  ]
  //}}}

export function ColumnOrderTable() {
  const [data, setData] = useState(() => [...defaultData])
  
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

  const rerender = () => setData([...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    state: {
      columnVisibility,
      columnOrder
    },

    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  })

  return (
    <>
      <div className='p-2'>

      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler()
            }} /> {" "}
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id}>
              <label>
                <input {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler()
                }} />{" "}
                {column.id}
              </label>
            </div>
          )
        })}
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => rerender()} className="border p-1">
          Regenerate
        </button>
      </div>
      <div className="h-4" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='h-4' />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </>
  )
}