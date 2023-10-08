// import React from 'react';
// import { Pagination } from 'react-bootstrap';

// const MyPagination = ({ currentPage, totalPages, onPageChange }) => {
//   const items = [];
//   if(currentPage>1) {
//     items.push(<Pagination.Prev key="prev" onClick={() => onPageChange(currentPage-1)} />)
//   }

//   for (let page = 1; page <= totalPages; page++) {
//     items.push(
//       <Pagination.Item key={page} data-page={page} active={page === currentPage} onClick={()=> onPageChange(page)}>
//         {page}
//       </Pagination.Item>
//     )
//   }

//   if(currentPage<totalPages) {
//     items.push(<Pagination.Next key="next" onClick={() => onPageChange(currentPage+1)} />)
//   }

//   return (
//     <Pagination>
//       {items}
//     </Pagination>
//   );
// };

// export default MyPagination;


import React from 'react'

const MyPagination = ({ currentPage, setCurrentPage, startIndex, endIndex, numbers, totalPages }) => {

  const onPageChange = (id) => {
    setCurrentPage(id);
  };

  const prevPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
    console.log("clicked")
  }

  const nextPage = () => {
    if(currentPage !== totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  console.log("current page: ", currentPage);
  console.log("endIndex: ", endIndex);

  return (
    <nav>
  <ul className="pagination">
    <li className="page-item" >
      <a className="page-link" href="#" onClick={prevPage}>Previous</a>
    </li>
    {
      numbers.map((n, i) => (
        <li className={`page-item ${currentPage === n ? 'active': ''}`} key={i}>
          <a href='#' className='page-link' onClick={() => onPageChange(n)}>{n}</a>
        </li>
      ))
    }
    <li className="page-item">
      <a className="page-link" href="#" onClick={nextPage}>Next</a>
    </li>
  </ul>
</nav>
  )
}

export default MyPagination
