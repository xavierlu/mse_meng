import React from "react";
import { connect } from "react-redux";
import { Card, Button, DatePicker } from "antd";
import { getPostDetail } from "../store/actions/posts";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

import Hoc from "../hoc/hoc";
import QA from "./QA";
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
    const {
      title,
      abstract,
      description,
      studentNeeded,
      requirements,
      semester,
      internship,
      email,
      phoneNumber
    } = this.props.currentPost;
    return (
      <Hoc>
        {this.props.is_student ? (
          <Card
            title={title}
            extra={
              <Link to="/">
                <Button icon="left-circle"> Back </Button>
              </Link>
            }
          >
            <Card type="inner" title="Abstract">
              {abstract}
            </Card>
            <Card type="inner" title="Description">
              {description}
            </Card>
            <Card type="inner" title="studentNeeded">
              {studentNeeded}
            </Card>
            <Card type="inner" title="requirements">
              {requirements}
            </Card>
            <Card type="inner" title="semester offered">
              {semester}
            </Card>
            <Card type="inner" title="internship offered">
              {internship}
            </Card>
            <Card type="inner" title="e-mail">
              {email}
            </Card>
            <Card type="inner" title="Phone Number">
              {phoneNumber}
            </Card>
            <Card type="inner" title="Q&A">
              <QA />
            </Card>
          </Card>
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
