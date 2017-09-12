import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container-element d-flex flex-column'>
    <NavBar />

    <div className='d-flex align-items-stretch page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
