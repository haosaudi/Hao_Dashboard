import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from "@coreui/react";
import { connect } from "react-redux";
import { AuthAction } from "../redux-store/actions";

import CIcon from "@coreui/icons-react";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import { _nav, Provider } from "../_nav";
import { array } from "prop-types";

const AppSidebar = (props) => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  let navigation = props.role == "Provider" ? Provider : _nav;
  console.log("rolerole==========", props.role);












  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log("show")}
      onHide={() => {
        dispatch({ type: "set", sidebarShow: false });
      }}
    >
      <CSidebarBrand
        style={{ backgroundColor: "#A2CCC4" }}
        className="d-none d-md-flex"
        to="/"
      >
        {/* <CIcon className="sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} /> */}
        <h3 style={{ fontWeight: "bold" }}>HAOSAUDI 1.3</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
          {/* {console.log("CAHTHIGN", navigation())} */}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

// export default React.memo(AppSidebar)

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  role: state.AuthReducer.role,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  SignIn: AuthAction.Signin,
};

export default connect(mapStateToProp, mapDispatchToProps)(AppSidebar);
