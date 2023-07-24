import { useReducer, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

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
const columnHelper = createColumnHelper<Person>()
const columns = [
  columnHelper.accessor("firstName", {
    header: () => <span>First Name</span>,
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor("lastName", {
    header: () => <span>Last Name</span>,
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor("age", {
    header: () => <span>Age</span>,
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]//}}}

export function BasicTable() {

  const [data,] = useState(() => [...defaultData])
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='p-2'>
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
