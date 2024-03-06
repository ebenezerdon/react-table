import React, { useState } from 'react'
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
  const recordsPerPage = 10

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.ctRoot.length / recordsPerPage)
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  const handleRowClick = (person: Person) => {
    setSelectedPerson(person)
    setShowModal(true)
  }

  const startIndex = currentPage * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = data.ctRoot.slice(startIndex, endIndex)

  return (
    <main>
      <div className="custom-style table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((person) => (
              <tr key={person._id} onClick={() => handleRowClick(person)} style={{ cursor: 'pointer' }}>
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
