import React, { useState, useEffect } from 'react'
import './DataTable.scss'
import PersonDetailsModal from './PersonDetailsModal'
import { Person } from '../data/types'

type DataTableProps = {
  data: {
    ctRoot: Person[]
  }
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [jumpToRow, setJumpToRow] = useState('')
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
  const recordsPerPage = 10

  useEffect(() => {
    if (jumpToRow) {
      const rowNumber = parseInt(jumpToRow, 10)
      if (!isNaN(rowNumber) && rowNumber >= 1 && rowNumber <= data.ctRoot.length) {
        const pageNumber = Math.ceil(rowNumber / recordsPerPage) - 1
        setCurrentPage(pageNumber)
        setHighlightedRow(data.ctRoot[rowNumber - 1]._id)
      }
    }
  }, [jumpToRow, data.ctRoot])

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
    setHighlightedRow(null)
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.ctRoot.length / recordsPerPage)
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
    setHighlightedRow(null)
  }

  const handleRowClick = (person: Person) => {
    setSelectedPerson(person)
    setShowModal(true)
  }

  const clearJumpToRow = () => {
    setJumpToRow('')
    setHighlightedRow(null)
  }

  const startIndex = currentPage * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = data.ctRoot.slice(startIndex, endIndex)

  return (
    <main>
      <div className="jump-to-row my-3">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter row number (1-500)"
            value={jumpToRow}
            onChange={(e) => setJumpToRow(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={clearJumpToRow}>
            Clear
          </button>
        </div>
      </div>
      <div className="custom-style table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th className="index-col">#</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Salary</th>
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
      <div className="d-flex align-items-center my-4 justify-content-center">
        <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${Math.ceil(data.ctRoot.length / recordsPerPage)}`}</span>
        <button
          className="btn btn-primary ms-2"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(data.ctRoot.length / recordsPerPage) - 1}
        >
          Next
        </button>
      </div>
      {showModal && selectedPerson && (
        <PersonDetailsModal person={selectedPerson} onClose={() => setShowModal(false)} />
      )}
    </main>
  )
}

export default DataTable
