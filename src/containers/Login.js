import React from "react";
import { Form, Icon, Input, Button, Divider, Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;

class Login extends React.Component {
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
    if (!this.props.error && this.props.token !== null) {
      this.props.history.push("/");
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={40} type="flex" align="middle">
        <Col span={12} type="flex" align="middle">
          <Divider orientation="left">Student NetID Login</Divider>
          {this.props.loading ? (
            <Spin
              indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              onSubmit={this.handleStudentLogin}
              className="login-form-student"
            >
              <FormItem label="NetID">
                {getFieldDecorator("netid", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your NetID!"
                    }
                  ]
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="NetID"
                  />
                )}
              </FormItem>

              <FormItem wrapperCol={{ span: 12, offset: 5 }}>
                <Button
                  type="danger"
                  size="large"
                  htmlType="submit"
                  style={{ marginRight: "12px" }}
                >
                  Login
                </Button>
              </FormItem>
            </Form>
          )}
        </Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

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
