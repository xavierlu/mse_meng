import React from "react";
import { connect } from "react-redux";
import { Form, Divider, Typography } from "antd";
import { getPostDetail } from "../store/actions/posts";
import { withRouter } from "react-router-dom";

import Hoc from "../hoc/hoc";
import PostForm from "./PostForm";

class PostDetail extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPostDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPostDetail(newProps.token, this.props.match.params.id);
      }
    }
  }
  render() {
    const { Text, Paragraph } = Typography;

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

    return (
      <Hoc>
        {this.props.is_student ? (
          <Typography>
            <Divider orientation="left">Project Information</Divider>
            <Form.Item {...formItemLayout} label="Company">
              <Text>{this.props.currentPost.company}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Title">
              <Text>{this.props.currentPost.title}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Abstract">
              <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                {this.props.currentPost.abstract}
              </Paragraph>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Description">
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.props.currentPost.description}
              </Paragraph>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Student Needed">
              <Text>{this.props.currentPost.studentNeeded}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Requirements">
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.props.currentPost.requirements}
              </Paragraph>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Semester(s) Offered">
              <Text>
                {(this.props.currentPost.semester + "")
                  .substring(
                    1,
                    (this.props.currentPost.semester + "").length - 1
                  )
                  .split(",")
                  .filter(item => item.trim().length >= 6)}
              </Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Internship Opportunity?">
              <Text>{this.props.currentPost.internship}</Text>
            </Form.Item>

            <Divider orientation="left">Contact Information</Divider>

            <Form.Item {...formItemLayout} label="Name">
              <Text>{this.props.currentPost.name}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="email">
              <Text>{this.props.currentPost.email}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Phone number">
              <Text>{this.props.currentPost.phoneNumber}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Website">
              <Text>{this.props.currentPost.website}</Text>
            </Form.Item>
          </Typography>
        ) : (
          <PostForm currentPost={this.props.currentPost} />
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentPost: state.posts.currentPost,
    loading: state.posts.loading,
    is_student: state.auth.is_student
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostDetail: (token, id) => dispatch(getPostDetail(token, id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);
