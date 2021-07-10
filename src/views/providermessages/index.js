import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
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
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import { CategoryAction, CityAction, ProviderMessagesAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import moment from "moment";
import Sortedtable from '../../components/sortedtables'
// import state from "sweetalert/typings/modules/state";


const Category = (props) => {

  const [providerMessages, setProviderMessages] = useState([]);

  useEffect(() => {
    if (props.token) {
      props.providermessages(props.token);
    }
  }, []);
  useEffect(() => {
    setProviderMessages(props.providerMessages.map((item, i) => {
      return {
        // ...item,
        profileImage: <img
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,

            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: "0.2px solid grey",
          }}
          src={
            item?.profile_img?.search("https://") !== -1
              ? item.profile_img
              : `http://18.217.187.206/img/city_img/${item.profile_img ? item.profile_img.toLowerCase() : ""
              }`
          }
        />,
        From: item.first_name + " " + ' ' + item.last_name,
        action: <span
          onClick={() => {
            // deleteCity(index, val.id);
            props.history.push(`/providermessages/viewprovidermessages/${item.id}`)

          }}
          style={{
            color: "red",
            fontSize: 12,
            cursor: "pointer",
            paddingLeft: 5,
          }}
        >
          Show
        </span>,
        Date: moment(item.updated_at).format('YY-DD-MM')
        // }
      }
    }));
  }, [props.providerMessages]);

  return (
    <>
      {console.log("I GOT THE CATEGORIES", providerMessages)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "bold" }}>
          Provider Messagess{" "}
          {/* <span
            onClick={() => props.history.push("/city/add")}
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#309CE4",
              textDecorationLine: "underline",
              cursor: "pointer",  
            }}
          >
            Add New City
          </span> */}
        </CCardHeader>
        <Sortedtable
          dataArray={providerMessages}
          //   "Images",

          // "From",
          // "Experience",
          // "Date",
          // "Action",
          columns={[
            {
              label: 'Images',
              field: 'profileImage',
              sort: 'asc',
              // width: 150
            },
            {
              label: 'From',
              field: 'From',
              sort: 'asc',
              // width: 150
            },

            {
              label: 'Experience Name',
              field: 'title_ar',
              sort: 'asc',
              width: 200
            },
            {
              label: ' Date',
              field: 'Date',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Action',
              field: 'action',
              sort: 'asc',
              width: 100
            },
          ]}
        />
      </CCard>
    </>
  );
};

Category.propTypes = {
  providermessages: PropTypes.func,
  DeleteCity: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  providerMessages: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  providerMessages: state.ProviderMessagesReducer.providerMessages,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  providermessages: ProviderMessagesAction.GetAllProviderMessages,
  DeleteCity: ProviderMessagesAction.DeleteCity,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
<>

  {/* <CCardBody>
  <CTable caption="top">
    <CTableHead>
      <CTableRow>
        {categoryTableHeading.map((val, index) => (
          <CTableHeaderCell key={index} scope="col">
            {val}
          </CTableHeaderCell>
        ))}

      </CTableRow>
    </CTableHead>
    <CTableBody>
      {providerMessages?.length > 0
        ? providerMessages?.map((val, index) => (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">
              <img
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,

                  display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: "0.2px solid grey",
                }}
                src={
                  val?.profile_img?.search("https://") !== -1
                    ? val.profile_img
                    : `http://18.217.187.206/img/city_img/${val.profile_img ? val.profile_img.toLowerCase() : ""
                    }`
                }
              />
            </CTableHeaderCell>
            <CTableDataCell>{val.first_name + " " + ' ' + val.last_name}</CTableDataCell>
            {/* <CTableDataCell>{val.description_ar}</CTableDataCell> */}
  {/* <CTableDataCell>{val.title_ar}</CTableDataCell>
  <CTableDataCell>{moment(val.updated_at).format("YYYY-DD-MM")}</CTableDataCell>
  <CTableDataCell
  >

    <span
      onClick={() => {
        // deleteCity(index, val.id);
        props.history.push(`/providermessages/viewprovidermessages/${val.id}`)

      }}
      style={{
        color: "red",
        fontSize: 12,
        cursor: "pointer",
        paddingLeft: 5,
      }}
    >
      Show
    </span>
  </CTableDataCell>

</CTableRow>
        ))
        : null}

     
    </CTableBody >
  </CTable >
</CCardBody > * /} */}

</>
