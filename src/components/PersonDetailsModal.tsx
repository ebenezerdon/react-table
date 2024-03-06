import React, { useEffect, useRef } from 'react'
import { Person } from '../data/types'

type PersonDetailsModalProps = {
  person: Person
  onClose: () => void
}

const PersonDetailsModal: React.FC<PersonDetailsModalProps> = ({ person, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  /* Close modal on Esc key press */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  /* Close modal on backdrop click */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && modalRef.current === event.target) {
      onClose()
    }
  }

  return (
    <div className="modal" style={{ display: 'block' }} onClick={handleBackdropClick} ref={modalRef}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Person Details</h5>
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
