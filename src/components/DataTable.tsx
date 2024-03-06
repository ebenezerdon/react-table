import React from 'react'
import './DataTable.scss'

type Person = {
  _id: string
  name: string
  dob: string
  address: {
    street: string
    town: string
    postode: string
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
  return (
    <div className="custom-style table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-primary">
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Pets</th>
            <th>Score</th>
            <th>Email</th>
            <th>URL</th>
            <th className="desc">Description</th>
            <th>Verified</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.ctRoot.map((person) => (
            <tr key={person._id}>
              <td data-label="Name">{person.name}</td>
              <td data-label="DOB">{person.dob}</td>
              <td data-label="Address">{`${person.address.street}, ${person.address.town}, ${person.address.postode}`}</td>
              <td data-label="Telephone">{person.telephone}</td>
              <td data-label="Pets">{person.pets.join(', ')}</td>
              <td data-label="Score">{person.score}</td>
              <td data-label="Email">{person.email}</td>
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
