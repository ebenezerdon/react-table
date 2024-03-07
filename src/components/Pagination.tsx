type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="d-flex align-items-center my-4 justify-content-center">
      <button
        className="btn btn-primary me-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
      <button
        className="btn btn-primary ms-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
