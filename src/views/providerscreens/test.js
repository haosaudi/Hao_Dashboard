import PropTypes from "prop-types";
import React from "react";

import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CListGroup,
    CListGroupItem,
    CNav,
    CNavItem,
    CNavLink,
    CCol,
    CRow,
} from '@coreui/react'
const Test = () => {
    return (
        <>
        <h6>My Experience (08)</h6>
        <Row>
            {[1, 2, 3, 4].map(item => {
                return (
                    <Col span={8} style={{ marginTop: 20,marginBottom:10 }} xs={24} xl={8} md={18} >
                        <Card style={{width:"95%"}} >
                            <Row >
                                <Col span={12}>  <h4 style={{color:"#a1ccc4"}}>ART WORLD</h4> </Col>
                                <Col span={12}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width="90" height="90" style={{borderRadius:"10px",float:"right"}}/></Col>
                            </Row>
                            <Row style={{marginTop:"10px"}}>
                                <Col span={12} > <CButton color="primary" size="sm" color="danger">
                                    Sessions
                                </CButton></Col>
                                <Col span={12}> <CButton color="primary" size="sm" color="white" >
                                    Manage Files
                                </CButton></Col>
                            </Row>
                            <Row type="flex" align="middle">
                                <Col span={24} style={{textAlign:'center'}}> 
                                <CButton color="primary" size="sm" >
                                    Edit Experience
                                </CButton>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                )
            })}
        </Row>

        <h6>Pending Experience (02)</h6>
        <Row>
        {[1, 2, 3, 4].map(item => {
            return (
                <Col span={8} style={{ marginTop: 20,marginBottom:10 }} xs={24} xl={8} md={18} >
                    <Card style={{width:"95%"}} >
                        <Row >
                            <Col span={12}>  <h4 style={{color:"#a1ccc4"}}>ART WORLD</h4> </Col>
                            <Col span={12}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width="90" height="90" style={{borderRadius:"10px",float:"right"}}/></Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col span={12} > <CButton color="primary" size="sm" color="danger">
                                Sessions
                            </CButton></Col>
                            <Col span={12}> <CButton color="primary" size="sm" color="white" >
                                Manage Files
                            </CButton></Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={24} style={{textAlign:'center'}}> 
                            <CButton color="primary" size="sm" >
                                Edit Experience
                            </CButton>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            )
        })}
    </Row>
    </>

    )
}

export default Test