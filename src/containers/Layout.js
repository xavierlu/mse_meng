import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import CE_MSE_LOGO from "./CE_MSE.png";
import CORNELL_LOGO_RED from "./cuseal_full_red240.png";

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{ height: "113px", backgroundColor: "#F7F7F7" }}>
          <img
            src={CORNELL_LOGO_RED}
            height="73px"
            style={{
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 10,
              marginRight: 7
            }}
          />
          <img
            src={CE_MSE_LOGO}
            height="73px"
            style={{
              marginTop: 25,
              marginBottom: 15,
              marginLeft: 7,
              marginRight: 10
            }}
          />
        </Header>
        <Content style={{ padding: "0 50px", backgroundColor: "#F7F7F7" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/profiles/${this.props.userId}`}>Profile</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["2"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                    </span>
                  }
                >
                  {this.props.isAuthenticated ? (
                    <Menu.Item key="2" onClick={this.props.logout}>
                      Logout
                    </Menu.Item>
                  ) : (
                    <Menu.Item key="2">
                      <Link to="/login">Login</Link>
                    </Menu.Item>
                  )}
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                    </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Layout>
        </Content>

        <Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
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
