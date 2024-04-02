import { useState, useEffect } from 'react'
import Pagination from './Pagination'
import PersonDetailsModal from './PersonDetailsModal'
import './DataTable.scss'
import { Person } from '../data/types'

type DataTableProps = {
  data: Person[]
}

const DataTable = ({ data }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [targetRow, setTargetRow] = useState('')
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'
  const [filterText, setFilterText] = useState('')
  const recordsPerPage = 10

  useEffect(() => {
    if (targetRow) {
      const rowNumber = parseInt(targetRow, 10)
      if (!isNaN(rowNumber) && rowNumber >= 1 && rowNumber <= data.length) {
        const pageNumber = Math.ceil(rowNumber / recordsPerPage) - 1
        setCurrentPage(pageNumber)
        setHighlightedRow(data[rowNumber - 1]._id)
      }
    }
  }, [targetRow, data])

  const handleRowClick = (person: Person) => {
    setSelectedPerson(person)
    setShowModal(true)
    setHighlightedRow(person._id)
    setTargetRow('')
  }

  const clearTargetRowNumber = () => {
    setTargetRow('')
    setHighlightedRow(null)
  }

  const handleSort = (field: string) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(order)
  }

  const filteredData = data.filter((person) => {
    if (filterText) {
      return person.name.toLowerCase().includes(filterText?.toLowerCase())
    } else return true
  })

  const sortedData = filteredData.sort((a, b) => {
    if (!sortField) return 0

    if (a[sortField as keyof Person] < b[sortField as keyof Person]) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (a[sortField as keyof Person] > b[sortField as keyof Person]) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })

  const startIndex = currentPage * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = sortedData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedData.length / recordsPerPage)

  return (
    <main>
      <div className="jump-to-row my-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder={`Enter row number (1-${sortedData.length})`}
            value={targetRow}
            onChange={(e) => setTargetRow(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={clearTargetRowNumber}>
            Clear
          </button>
        </div>
      </div>
      <div className="custom-style table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th className="index-col">#</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('dob')}>DOB</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th onClick={() => handleSort('verified')}>Verified</th>
              <th onClick={() => handleSort('salary')}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((person, index) => (
              <tr
                key={person._id}
                onClick={() => handleRowClick(person)}
                onKeyDown={(e) => e.key === 'Enter' && handleRowClick(person)}
                role="button"
                tabIndex={0}
                className={person._id === highlightedRow ? 'highlighted' : ''}
              >
                <td>{startIndex + index + 1}</td>
                <td>{person.name}</td>
                <td>{person.dob}</td>
                <td>{person.email}</td>
                <td>{person.verified ? 'Yes' : 'No'}</td>
                <td>{person.salary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      {showModal && selectedPerson && (
        <PersonDetailsModal person={selectedPerson} onClose={() => setShowModal(false)} />
      )}
    </main>
  )
}

export default DataTable
