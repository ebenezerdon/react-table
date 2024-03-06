import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import PersonDetailsModal from './PersonDetailsModal'
import './DataTable.scss'
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
  const [targetRow, setTargetRow] = useState('')
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null)
  const recordsPerPage = 10

  /* Jump to row page and highlight the row */
  useEffect(() => {
    if (targetRow) {
      const rowNumber = parseInt(targetRow, 10)
      if (!isNaN(rowNumber) && rowNumber >= 1 && rowNumber <= data.ctRoot.length) {
        const pageNumber = Math.ceil(rowNumber / recordsPerPage) - 1
        setCurrentPage(pageNumber)
        setHighlightedRow(data.ctRoot[rowNumber - 1]._id)
      }
    }
  }, [targetRow, data.ctRoot])

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

  const startIndex = currentPage * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = data.ctRoot.slice(startIndex, endIndex)
  const totalPages = Math.ceil(data.ctRoot.length / recordsPerPage)

  return (
    <main>
      <div className="jump-to-row my-3">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder={`Enter row number (1-${data.ctRoot.length})`}
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {showModal && selectedPerson && (
        <PersonDetailsModal person={selectedPerson} onClose={() => setShowModal(false)} />
      )}
    </main>
  )
}

export default DataTable
