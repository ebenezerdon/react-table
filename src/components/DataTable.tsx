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
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="table-primary">
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Pets</th>
            <th>Score</th>
            <th>Email</th>
            <th>URL</th>
            <th>Description</th>
            <th>Verified</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.ctRoot.map((person) => (
            <tr key={person._id}>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{`${person.address.street}, ${person.address.town}, ${person.address.postode}`}</td>
              <td>{person.telephone}</td>
              <td>{person.pets.join(', ')}</td>
              <td>{person.score}</td>
              <td>{person.email}</td>
              <td>
                <a href={person.url}>{person.url}</a>
              </td>
              <td>{person.description}</td>
              <td>{person.verified ? 'Yes' : 'No'}</td>
              <td>{person.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
