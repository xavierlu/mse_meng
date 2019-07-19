import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Spin,
  notification
} from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStudentLogin: false,
      netid: null,
      allowed: [
        "xll2",
        "akd9",
        "map457",
        "kza7",
        "jc3444",
        "ccf74",
        "lh649",
        "hh697",
        "hj387",
        "jkk92",
        "rp593",
        "eq34",
        "pv254",
        "yw2283",
        "yw2286",
        "zw623",
        "yy889",
        "acy48",
        "rhy27",
        "wy293",
        "hz522",
        "xz727",
        "zx59",
        "ss2974"
      ]
    };
  }

  setStudent = (flag, id) => {
    this.setState({ isStudentLogin: flag, netid: id });
  };

  handleStudentLogin = e2 => {
    e2.preventDefault();
    this.props.form.validateFields(["netid"], (err, values) => {
      if (!err) {
        if (this.state.allowed.includes(values.netid)) {
          this.props.onAuth(values.netid + "@cornell.edu", values.netid);
          this.setStudent(true, values.netid);
        } else {
          notification["error"]({
            placement: "topLeft",
            message: "Permission denied",
            description:
              "Unfortunately, your NetID does not allow you to login."
          });
        }
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

        this.setStudent(false, null);
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
        actions.authSignup(
          username,
          email,
          username,
          username,
          password1,
          password2,
          is_student
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
