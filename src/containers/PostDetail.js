import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { getPostDetail } from "../store/actions/posts";
import { Link, withRouter } from "react-router-dom";

import Hoc from "../hoc/hoc";

class PostDetail extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPostDetail(
        this.props.token,
        this.props.match.params.id
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPostDetail(
          newProps.token,
          this.props.match.params.id
        );
      }
    }
  }
  render() {
    const { title } = this.props.currentPost;
    return (
      <Hoc>
        {Object.keys(this.props.currentPost).length > 0 ? (
          <Card
            title={title}
            extra={
              <Link to="/">
                <Button icon="left-circle"> Back </Button>
              </Link>
            }
          >
            <Card type="inner" title="Inner Card title">
              Inner Card content
            </Card>
          </Card>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentPost: state.posts.currentPost,
    loading: state.posts.loading
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
