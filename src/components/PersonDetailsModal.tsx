import React from 'react'
import { Person } from '../data/types'

type PersonDetailsModalProps = {
  person: Person
  onClose: () => void
}

const PersonDetailsModal: React.FC<PersonDetailsModalProps> = ({ person, onClose }) => {
  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Person Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Name:</strong> {person.name}
            </p>
            <p>
              <strong>DOB:</strong> {person.dob}
            </p>
            <p>
              <strong>Email:</strong> {person.email}
            </p>
            <p>
              <strong>Address:</strong> {`${person.address.street}, ${person.address.town}, ${person.address.postode}`}
            </p>
            <p>
              <strong>Telephone:</strong> {person.telephone}
            </p>
            <p>
              <strong>Pets:</strong> {person.pets.join(', ')}
            </p>
            <p>
              <strong>Score:</strong> {person.score}
            </p>
            <p>
              <strong>URL:</strong> <a href={person.url}>{person.url}</a>
            </p>
            <p>
              <strong>Description:</strong> {person.description}
            </p>
            <p>
              <strong>Verified:</strong> {person.verified ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Salary:</strong> {person.salary.toLocaleString()}
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonDetailsModal
