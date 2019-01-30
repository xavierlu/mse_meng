import React from "react";
import { Layout, Menu, Icon, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import CE_MSE_LOGO from "./assets/CE_MSE.png";
import CORNELL_LOGO_RED from "./assets/cuseal_full_red240.png";

const { Header, Content, Footer, Sider } = Layout;

const info = () => {
  message.success("Successfully logged out");
};

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{ height: "123px", backgroundColor: "#F7F7F7" }}>
          <img
            src={CORNELL_LOGO_RED}
            alt="Cornell Logo"
            height="73px"
            style={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 10,
              marginRight: 10
            }}
          />
          <img
            src={CE_MSE_LOGO}
            height="73px"
            alt="MS&E Logo"
            style={{
              marginTop: 35,
              marginBottom: 25,
              marginLeft: 10,
              marginRight: 10
            }}
          />
        </Header>
        <Content style={{ padding: "0 50px", backgroundColor: "#F7F7F7" }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultOpenKeys={["sub1"]}
                selectedKeys={[this.props.location.pathname]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="/">
                  {this.props.isAuthenticated ? (
                    <Icon type="appstore" />
                  ) : (
                    <Icon type="smile" />
                  )}

                  <span>
                    {this.props.isAuthenticated ? "Project" : "Welcome"}
                  </span>
                  <Link to="/" />
                </Menu.Item>
                {this.props.isAuthenticated ? (
                  <Menu.Item key="/profile/">
                    <Icon type="user" />
                    <span> Profile </span>
                    <Link to="/profile/" />
                  </Menu.Item>
                ) : null}
                {this.props.isAuthenticated && this.props.is_company ? (
                  <Menu.Item key="/post/">
                    <Icon type="form" />
                    <span> Post </span>
                    <Link to="/post/" />
                  </Menu.Item>
                ) : null}
                {this.props.isAuthenticated ? (
                  <Menu.Item key="/login" onClick={this.props.logout}>
                    <Icon type="logout" />
                    <span> Logout </span>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="/login">
                    <Icon type="login" />
                    <span> Login </span>
                    <Link to="/login" />
                  </Menu.Item>
                )}
              </Menu>
            </Sider>

            <Content
              style={{ background: "#fff", padding: "0 24px", minHeight: 280 }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Content>

        <Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_company: state.auth.is_company
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
