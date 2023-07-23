import { TableComponent } from './components/Table/Table'
import { useReactTable } from '@tanstack/react-table'

function App() {

  const table = useReactTable(options)

  return (
    <>
      <TableComponent />
    </>
  )
}

export default App
