import React from "react";
import { connect } from "react-redux";
import { Icon, Layout, Row, Col } from "antd";

const { Header, Footer, Content } = Layout;

class Profile extends React.PureComponent {
  render() {
    return (
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
