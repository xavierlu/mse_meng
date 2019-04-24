import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Spin,
  Typography,
  Divider,
  Col,
  message
} from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class LoginCompany extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password);
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error) {
      console.log(this.props.error.response.data);

      message.error(
        this.props.error.response.data.non_field_errors
          ? "Unable to log in with provided credentials."
          : "Somethine went wrong"
      );
    }
  }

  render() {
    let errorMessage = null;
    if (!this.props.error && this.props.token !== null) {
      this.props.history.push("/");
    }
    const { Text } = Typography;

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 12 }
      }
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Col type="flex" align="middle">
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Divider orientation="left">Company Login & Signup</Divider>
            <div>
              <Typography>
                <Text strong>
                  If you do not have an account, please click the
                </Text>
                <Text strong type="danger">
                  {" "}
                  signup{" "}
                </Text>
                <Text strong>button on the button</Text>
              </Typography>
              <br />
            </div>
            <Form.Item {...formItemLayout} label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="email"
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Password">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ marginRight: "12px" }}
              >
                Login
              </Button>
              <Button
                type="danger"
                size="large"
                style={{ marginRight: "12px" }}
              >
                <NavLink to="/signup/">Signup</NavLink>
              </Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    );
  }
}

const WrappedLoginCompany = Form.create()(LoginCompany);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginCompany);
