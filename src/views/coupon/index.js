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
import { CategoryAction, CityAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import CouponAction from 'src/redux-store/actions/coupon'
import moment from 'moment'

const Category = (props) => {
  const categoryTableHeading = [
    'Booked By',
    'Coupon Level',
    'Amount',
    'Amount Type',
    'Expire Date',
    'Single Use?',
    'Enabled',
  ]

  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    if (props.token) {
      props.GetCoupons(props.token)
    }
  }, [])
  useEffect(() => {
    setCoupons(props.coupons)
  }, [props.coupons])
  const DeleteCoupon = (i, id) => {
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
        props.DeleteCoupon(id, props.token)
        setCoupons(coupons.filter((item, ind) => ind !== i))
      } else {
        swal('Your category is safe!')
      }
    })
  }
  return (
    <>
      {console.log('I GOT THE CATEGORIES', props.coupons)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: 'bold' }}>
          Coupons{' '}
          <span
            onClick={() => props.history.push('/coupon/add')}
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#309CE4',
              textDecorationLine: 'underline',
              cursor: 'pointer',
            }}
          >
            Add New Coupons
          </span>
        </CCardHeader>
        <CCardBody>
          <CTable caption="top">
            <CTableCaption>List of Coupons</CTableCaption>
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
              {coupons?.length > 0
                ? coupons?.map((val, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{val.coupon_code}</CTableHeaderCell>
                      <CTableDataCell>{val.coupon_type}</CTableDataCell>
                      {/* <CTableDataCell>{val.description_ar}</CTableDataCell> */}
                      <CTableDataCell>{val.amount}</CTableDataCell>
                      <CTableDataCell>{val.amount_type}</CTableDataCell>
                      <CTableDataCell>{moment(val.expiry_date).format('DD-MM-yy')}</CTableDataCell>
                      <CTableDataCell>{val.status}</CTableDataCell>
                      <CTableDataCell
                      // style={{ color: '#309CE4', fontSize: 12, cursor: 'pointer' }}
                      >
                        {val.status}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                : null}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

Category.propTypes = {
  GetCoupons: PropTypes.func,
  DeleteCoupon: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  coupons: PropTypes.array,
}

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  coupons: state.CouponReducer.coupons,
  // userData: state.AuthReducer.userData,
})

const mapDispatchToProps = {
  GetCoupons: CouponAction.GetAllCoupons,
  DeleteCoupon: CouponAction.DeleteCoupon,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
