import React from "react";
import { Layout, Menu, Icon, Popconfirm } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import CE_MSE_LOGO from "./assets/CE_MSE.png";
import CORNELL_LOGO_RED from "./assets/cuseal_full_red240.png";
import Hoc from "../hoc/hoc";

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header
          style={{
            padding: window.innerWidth <= 500 ? "0 10px" : "0 50px",
            height: window.innerWidth <= 500 ? "70px" : "123px",
            backgroundColor: "#F7F7F7"
          }}
        >
          <img
            src={CORNELL_LOGO_RED}
            alt="Cornell Logo"
            height={window.innerWidth <= 500 ? "40px" : "73px"}
            style={{
              marginTop: window.innerWidth <= 500 ? 15 : 30,
              marginBottom: window.innerWidth <= 500 ? 15 : 30,
              marginLeft: 5,
              marginRight: 5
            }}
          />
          <img
            src={CE_MSE_LOGO}
            height={window.innerWidth <= 500 ? "40px" : "73px"}
            alt="MS&E Logo"
            style={{
              marginTop: window.innerWidth <= 500 ? 20 : 35,
              marginBottom: window.innerWidth <= 500 ? 15 : 25,
              marginLeft: window.innerWidth <= 500 ? 5 : 10,
              marginRight: window.innerWidth <= 500 ? 5 : 10
            }}
          />
        </Header>
        <Content
          style={{
            padding: window.innerWidth <= 500 ? "0 10px" : "0 50px",
            backgroundColor: "#F7F7F7"
          }}
        >
          <Layout style={{ background: "#fff" }}>
            {window.innerWidth <= 500 ? (
              <Menu
                mode="horizontal"
                defaultOpenKeys={["sub1"]}
                selectedKeys={[this.props.location.pathname]}
              >
                <Menu.Item key="/">
                  {this.props.isAuthenticated ? (
                    <Icon type="appstore" />
                  ) : (
                    <Icon type="smile" />
                  )}

                  <Link to="/" />
                </Menu.Item>
                {this.props.isAuthenticated && this.props.is_company ? (
                  <Menu.Item key="/post/">
                    <Icon type="form" />
                    <span> Post </span>
                    <Link to="/post/" />
                  </Menu.Item>
                ) : null}
                {this.props.isAuthenticated ? (
                  <Menu.Item key="/login">
                    <Popconfirm
                      placement="bottom"
                      title={"Are you sure you want to sign out?"}
                      onConfirm={this.props.logout}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon type="logout" />
                      <span> Logout </span>
                      <Link to="/" />
                    </Popconfirm>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="/login">
                    <Icon type="book" />
                    <span> Student </span>
                    <Link to="/login" />
                  </Menu.Item>
                )}

                {this.props.isAuthenticated ? (
                  <Menu.Item>
                    <Icon type="user" />
                    <span>{this.props.username}</span>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="/login-company">
                    <Icon type="bank" />
                    <span> Company </span>
                    <Link to="/login-company" />
                  </Menu.Item>
                )}
              </Menu>
            ) : (
              <Sider width={230} style={{ background: "#fff" }}>
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
                  {this.props.isAuthenticated && this.props.is_company ? (
                    <Menu.Item key="/post/">
                      <Icon type="form" />
                      <span> Post </span>
                      <Link to="/post/" />
                    </Menu.Item>
                  ) : null}
                  {this.props.isAuthenticated ? (
                    <Menu.Item key="/login">
                      <Popconfirm
                        placement="right"
                        title={"Are you sure you want to sign out?"}
                        onConfirm={this.props.logout}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Icon type="logout" />
                        <span> Logout </span>
                        <Link to="/" />
                      </Popconfirm>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="/login">
                      <Icon type="book" />
                      <span> Student Login </span>
                      <Link to="/login" />
                    </Menu.Item>
                  )}

                  {this.props.isAuthenticated ? (
                    <Menu.Item>
                      <Icon type="user" />
                      <span>{this.props.username}</span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="/login-company">
                      <Icon type="bank" />
                      <span> Company Login </span>
                      <Link to="/login-company" />
                    </Menu.Item>
                  )}
                </Menu>
              </Sider>
            )}

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
    username: state.auth.username,
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
