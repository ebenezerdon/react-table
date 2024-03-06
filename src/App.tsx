import './App.css'
import DataTable from './components/DataTable'
import data from './data/random-people-data.json'

function App() {
  console.log(data)

  return (
    <>
      <DataTable data={data} />
    </>
  )
}

export default App
