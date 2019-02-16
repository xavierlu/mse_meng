import React from "react";
import { Form, Icon, Input, Button, Spin, Row, Col, Alert } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      console.log(this.props.error);

      errorMessage = (
        <div>
          <Alert
            message="Error"
            description={this.props.error.message}
            type="error"
            showIcon
          />
          <br />
          </div>
          );
    } else {
      if (this.props.token !== null) this.props.history.push("/");
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={40} type="flex" align="middle">
        <Col span={12} type="flex" align="middle">
          Cornell Student
          <br />
          <br />
          <Button type="danger">NetID Login</Button>
        </Col>
        <Col span={12}>
          All others use the Visitor Login.
          <br /> <br />
          {errorMessage}
          {this.props.loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "12px" }}
                >
                  Login
                </Button>
                Or
                <NavLink
                  style={{ marginLeft: "2px", marginRight: "10px" }}
                  to="/signup/"
                >
                  Signup
                </NavLink>
              </FormItem>
            </Form>
          )}
        </Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
