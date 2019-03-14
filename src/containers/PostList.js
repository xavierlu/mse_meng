import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table } from "antd";
import * as actions from "../store/actions/posts";
import Hoc from "../hoc/hoc"; // higher order components

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

class PostList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPosts(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPosts(newProps.token);
      }
    }
  }

  renderItem(id) {
    return (
      <Link to={`/posts/${id}`}>
        <Button icon={this.props.is_company ? "edit" : "right"} />
      </Link>
    );
  }

  render() {
    const columns = [
      {
        title: "Project Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company"
      },
      {
        title: this.props.is_company ? "Edit Post" : "View More",
        dataIndex: "id",
        key: "id",
        render: id => this.renderItem(id)
      }
    ];

    return (
      <Hoc>
        {this.props.token === undefined || this.props.token === null ? (
          <Hoc>please login first</Hoc>
        ) : (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Table columns={columns} dataSource={this.props.posts} />
            )}
          </Hoc>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    posts: state.posts.posts,
    loading: state.posts.loading,
    is_company: state.auth.is_company
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: token => dispatch(actions.getPosts(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
