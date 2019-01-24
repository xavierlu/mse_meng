import React from "react";
import { connect } from "react-redux";
import { Icon, Layout, Row, Col } from "antd";

import Hoc from "../hoc/hoc";

const { Header, Footer, Content } = Layout;

class Profile extends React.PureComponent {
  render() {
    return (
      <Hoc>
        {this.props.token === undefined || this.props.token === null ? (
          <Hoc>please login first</Hoc>
        ) : (
          <div>
            <Row>
              <Col span={18} push={6}>
                col-18 col-push-6
              </Col>
              <Col span={6} pull={18}>
                col-6 col-pull-18
              </Col>
            </Row>
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    //
  };
};

export default connect(mapStateToProps)(Profile);
