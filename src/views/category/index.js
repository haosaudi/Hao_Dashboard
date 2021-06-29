import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { CategoryAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import swal from 'sweetalert'

const Category = (props) => {
  const categoryTableHeading = [
    'Category Image',
    'Category Name',
    'Category Description',
    'Category Status',
    'Action',
  ]

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (props.token) {
      props.GetCategories(props.token)
    }
  }, [])
  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])
  const deleteCategory = (i, id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this category!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your category has been deleted!', {
          icon: 'success',
        })
        props.DeleteCategory(id, props.token)
        setCategories(categories.filter((item, ind) => ind !== i))
      } else {
        swal('Your category is safe!')
      }
    })
  }
  return (
    <>
      {console.log('I GOT THE CATEGORIES', props.categories)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: 'bold' }}>
          Categories{' '}
          <span
            onClick={() => props.history.push('/category/add')}
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#309CE4',
              textDecorationLine: 'underline',
              cursor: 'pointer',
            }}
          >
            Add New Category
          </span>
        </CCardHeader>
        <CCardBody>
          <CTable caption="top">
            <CTableCaption>List of Categories</CTableCaption>
            <CTableHead>
              <CTableRow>
                {categoryTableHeading.map((val, index) => (
                  <CTableHeaderCell key={index} scope="col">
                    {val}
                  </CTableHeaderCell>
                ))}
                {/* <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {categories?.length > 0
                ? categories?.map((val, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <img
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          border: '0.2px solid grey',
                        }}
                        src={
                          val.img?.search('amazonaws') !== -1
                            ? val.img
                            : `http://18.217.187.206/img/category_img/${val.img ? val.img.toLowerCase() : ''
                            }`
                        }
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{val.name_ar}</CTableDataCell>
                    <CTableDataCell>{val.description_ar}</CTableDataCell>
                    <CTableDataCell>{val.status}</CTableDataCell>
                    <CTableDataCell
                    // style={{ color: '#309CE4', fontSize: 12, cursor: 'pointer' }}
                    >
                      <span
                        onClick={() => props.history.push(`/category/edit/${val.id}`)}
                        style={{ color: '#309CE4', fontSize: 12, cursor: 'pointer' }}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          deleteCategory(index, val.id)
                        }}
                        style={{
                          color: 'red',
                          fontSize: 12,
                          cursor: 'pointer',
                          paddingLeft: 5,
                        }}
                      >
                        Delete
                      </span>
                    </CTableDataCell>
                  </CTableRow>
                ))
                : null}

              {/* <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow> */}
              {/* <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>Larry</CTableDataCell>
                <CTableDataCell>the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow> */}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

Category.propTypes = {
  GetCategories: PropTypes.func,
  DeleteCategory: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  categories: PropTypes.array,
}

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  categories: state.CategoryReducer.categories,
  // userData: state.AuthReducer.userData,
})

const mapDispatchToProps = {
  GetCategories: CategoryAction.GetAllCategories,
  DeleteCategory: CategoryAction.DeleteCategory,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
