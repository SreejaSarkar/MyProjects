import React from 'react'

const Breadcrumb = ({breadCrumbData}) => {
  return (
    <div className="d-flex justify-content-center">
                <nav aria-label="breadcrumb">
                    <ol className='breadcrumb'>
                        {
                            breadCrumbData.map((data) => (
                                <li className='breadcrumb-item'>
                            <a href={data.url}>
                                {data.label}
                            </a>
                        </li>
                            ))
                        }
                    </ol>
                </nav>
            </div>
  )
}

export default Breadcrumb
