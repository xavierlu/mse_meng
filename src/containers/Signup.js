import React from "react";
import { Form, Input, Icon, Button, Select, Upload } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import Hoc from "../hoc/hoc";

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.userName,
          values.email,
          values.password,
          values.confirm,
          is_student,
          values.undergrads,
          values.major
        );
        this.props.history.push("/");
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>

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
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("userType", {
            rules: [
              {
                required: true,
                message: "Please select a user"
              }
            ]
          })(
            <Select placeholder="Please select a type">
              <Option value="student">Student</Option>
              <Option value="company">Company</Option>
            </Select>
          )}
        </FormItem>

        {this.props.form.getFieldValue("userType") === "student" ? (
          <Hoc>
            <FormItem>
              {getFieldDecorator("undergrads", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input your undergraduates university/college"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="bank" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Undergraduates university/college"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("major", {
                rules: [
                  {
                    required: true,
                    message: "Please input your undergraduates major"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="book" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Undergraduates major"
                />
              )}
            </FormItem>
            <Form.Item label="Files">
              <div className="dropbox">
                {getFieldDecorator("dragger", {
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                )}
              </div>
            </Form.Item>
          </Hoc>
        ) : null}

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Signup
          </Button>
          Or&nbsp;
          <NavLink style={{ marginLeft: "10px" }} to="/login/">
            login
          </NavLink>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (
      username,
      email,
      password1,
      password2,
      is_student,
      undergrads_university,
      undergrads_major
    ) =>
      dispatch(
        actions.authSignup(
          username,
          email,
          password1,
          password2,
          is_student,
          undergrads_university,
          undergrads_major
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
