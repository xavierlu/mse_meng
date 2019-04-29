import React from "react";
import { Form, Input, Icon, Button, message, notification } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
          values.userName,
          values.email,
          values.phoneNumber,
          values.name,
          values.password,
          values.confirm,
          false
        );
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

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error) {
      for (var prop in this.props.error.response.data) {
        message.error(this.props.error.response.data[prop]);
      }
    } else if (prevProps.loading !== this.props.loading && this.props.token) {
      message.loading("Registering", 2, () =>
        notification["success"]({
          message: "Successfully registered",
          description: "Nice :)"
        })
      );
    }
  }

  render() {
    if (!this.props.error && this.props.token !== null) {
      this.props.history.push("/");
    }

    const { getFieldDecorator } = this.props.form;
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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <FormItem label="Company Name">
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Company Name"
            />
          )}
        </FormItem>

        <FormItem label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="name"
            />
          )}
        </FormItem>

        <FormItem label="E-mail">
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
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </FormItem>

        <FormItem label="Phone Number">
          {getFieldDecorator("phoneNumber", {
            rules: [
              {
                required: true,
                message: "Please input your phone number!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={
                <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="phone name"
            />
          )}
        </FormItem>

        <FormItem label="Password">
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
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem label="Confirm Password">
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
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button
            type="danger"
            size="large"
            htmlType="submit"
            style={{ marginRight: "20px" }}
          >
            Register
          </Button>
          <Button type="primary" size="large">
            <NavLink to="/login-company/">Back to login</NavLink>
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (
      username,
      email,
      phoneNumber,
      name,
      password1,
      password2,
      is_student
    ) =>
      dispatch(
        actions.authSignup(
          username,
          email,
          phoneNumber,
          name,
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
)(WrappedRegistrationForm);
