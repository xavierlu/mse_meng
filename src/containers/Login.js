import React from "react";
import { Form, Icon, Input, Button, Spin, Row, Col, message } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStudentLogin: false,
      netid: null
    };
  }

  setStudent = (flag, id) => {
    this.setState({ isStudentLogin: flag, netid: id });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(["email", "password"], (err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password);
        this.setStudent(false, null);
      }
    });
  };

  handleStudentLogin = e2 => {
    e2.preventDefault();
    this.props.form.validateFields(["netid"], (err, values) => {
      if (!err) {
        this.props.onAuth(values.netid + "@cornell.edu", values.netid);
        this.setStudent(true, values.netid);
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

      if (this.state.isStudentLogin) {
        this.props.onRegister(
          this.state.netid,
          this.state.netid + "@cornell.edu",
          this.state.netid,
          this.state.netid,
          true
        );
      }
    }
  }

  render() {
    let errorMessage = null;
    if (!this.props.error && this.props.token !== null) {
      this.props.history.push("/");
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={40} type="flex" align="middle">
        <Col span={12} type="flex" align="middle">
          Cornell Student
          <br />
          <br />
          <Form
            onSubmit={this.handleStudentLogin}
            className="login-form-student"
          >
            <FormItem>
              {getFieldDecorator("netid", {
                rules: [
                  {
                    required: true,
                    message: "Please input your NetID!"
                  }
                ]
              })(
                <Input
                  style={{ width: 120, textAlign: "center" }}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="NetID"
                />
              )}
            </FormItem>

            <FormItem>
              <Button
                type="danger"
                htmlType="submit"
                style={{ marginRight: "12px" }}
              >
                Login
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col span={12}>
          Companies use this Login.
          <br /> <br />
          {errorMessage}
          {this.props.loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
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
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
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
    onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
    onRegister: (username, email, password1, password2, is_student) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_student)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
