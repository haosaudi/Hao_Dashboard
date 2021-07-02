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
// import { DocsLink } from 'src/reusable'
import { CategoryAction, BookingAction, GroupBookingAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import Sortedtable from '../../../components/sortedtables'
import moment from 'moment'

const Category = (props) => {
  const categoryTableHeading = [
    'Category Image',
    'Category Name',
    'Category Description',
    'Category Status',
    'Action',
  ]

  const [catBooking, setCategories] = useState([])
  const [state, setState] = useState({
    groupbookings: [], loader: false
  })

  useEffect(() => {
    if (props.token) {
      props.GetAllGroupBookingStats(props.token)
    }
  }, [])
  useEffect(() => {
    console.log("groupbookingStats==", props.groupbookingStats)

    setState({
      ...state, groupbookings: props.groupbookingStats
    })
  }, [props.groupbookingStats])

  // const EditBooking = (i, id) => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'Once deleted, you will not be able to recover this category!',
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       swal('Poof! Your category has been deleted!', {
  //         icon: 'success',
  //       })
  //       props.DeleteCategory(id, props.token)
  //       // setCategories(categories.filter((item, ind) => ind !== i))
  //       setState({ ...state, bookings: state.bookings.filter((item, ind) => ind !== i) })
  //     } else {
  //       swal('Your category is safe!')
  //     }
  //   })
  // }
  return (

    <>
      <CCard className="mb-4"

        style={{ fontWeight: 'bold', overflowY: 'scroll', background: 'white', width: '100%' }}
      >
        <CCardHeader >
          Group Bookings Stats


        </CCardHeader>
        <Sortedtable
          dataArray={state.groupbookings}
          columns={[

            {
              label: 'Booked By',
              field: 'booked_by',
              sort: 'asc',
              width: 200
            },

            {
              label: 'total Pays ',
              field: 'total_pay',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Count',
              field: 'count',
              sort: 'asc',
              width: 100
            },

          ]}

        // actions ={()=>}
        // delete={()=> EditBooking() }
        />
      </CCard>

    </>
  )
}

Category.propTypes = {
  GetAllGroupBooking: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  groupbookingStats: PropTypes.array,
}

const mapStateToProp = (state) => ({
  isLoading: state.GroupBookingsReducer.isLoading,
  token: state.AuthReducer.token,
  groupbookingStats: state.GroupBookingsReducer.groupbookingStats,

  // userData: state.AuthReducer.userData,
})

const mapDispatchToProps = {
  GetAllGroupBookingStats: GroupBookingAction.GetAllGroupBookingStats,
  // DeleteBooking: GroupBookingAction.DeleteBooking,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
