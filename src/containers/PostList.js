import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table, Tooltip, Typography, Divider } from "antd";
import * as actions from "../store/actions/posts";
import Hoc from "../hoc/hoc"; // higher order components

const { Title, Paragraph, Text } = Typography;

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

  renderEditButton(post) {
    return (
      <Hoc>
        {post.company !== this.props.username && this.props.is_company ? (
          <Tooltip title={"You can only edit your own post :("}>
            <Button type="dashed" type="danger" icon="frown" />
          </Tooltip>
        ) : (
          <Link to={`/posts/${post.id}`}>
            <Button icon={this.props.is_company ? "edit" : "right"} />
          </Link>
        )}
      </Hoc>
    );
  }

  render() {
    const columns = [
      {
        title: "Project Title",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title)
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        sorter: (a, b) => a.company.localeCompare(b.company)
      },
      {
        title: this.props.is_company ? "Edit Post" : "View More",
        key: "action",
        render: post => this.renderEditButton(post)
      }
    ];

    return (
      <Hoc>
        {this.props.token === undefined || this.props.token === null ? (
          <Hoc>
            <Typography>
              <Title level={2}>MSE 5010 Speical Project</Title>
              <Paragraph>Master of Engineering research project.</Paragraph>
              <Paragraph>
                <Text strong>When Offered: </Text>
                Fall, Spring. <br />
                <Text strong>Course Attribute: </Text> (CU-UGR) <br />
                <Text strong>Contact:</Text>
                Alex Deyhim (<Text copyable>akd9@cornell.edu</Text>)
              </Paragraph>
              <Divider />

              <Title level={2}>Guidelines and Resources</Title>
              <Paragraph>
                <ul>
                  <li>
                    <a href="https://classes.cornell.edu/browse/roster/FA18/class/MSE/5010">
                      Class Roster
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mse.cornell.edu/mse/programs/graduate-programs/master-engineering">
                      MS&E M.Eng Website
                    </a>
                  </li>
                </ul>
              </Paragraph>
            </Typography>
          </Hoc>
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
    username: state.auth.username,
    email: state.auth.email,
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
