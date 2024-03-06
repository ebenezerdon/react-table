import React, { useState } from 'react'
import './DataTable.scss'

type Person = {
  _id: string
  name: string
  dob: string
  address: {
    street: string
    town: string
    postcode: string
  }
  telephone: string
  pets: string[]
  score: number
  email: string
  url: string
  description: string
  verified: boolean
  salary: number
}

type DataTableProps = {
  data: {
    ctRoot: Person[]
  }
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const recordsPerPage = 10

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.ctRoot.length / recordsPerPage)
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  const startIndex = currentPage * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = data.ctRoot.slice(startIndex, endIndex)

  return (
    <div className="custom-style table-responsive">
      <div className="d-flex align-items-center my-3">
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

      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-primary">
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Pets</th>
            <th>Score</th>
            <th>URL</th>
            <th className="desc">Description</th>
            <th>Verified</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((person) => (
            <tr key={person._id}>
              <td data-label="Name">{person.name}</td>
              <td data-label="DOB">{person.dob}</td>
              <td data-label="Address">{`${person.address.street}, ${person.address.town}, ${person.address.postcode}`}</td>
              <td data-label="Telephone">{person.telephone}</td>
              <td data-label="Email">{person.email}</td>
              <td data-label="Pets">{person.pets.join(', ')}</td>
              <td data-label="Score">{person.score}</td>
              <td data-label="URL">
                <a href={person.url}>{person.url}</a>
              </td>
              <td data-label="Description">{person.description}</td>
              <td data-label="Verified">{person.verified ? 'Yes' : 'No'}</td>
              <td data-label="Salary">{person.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
