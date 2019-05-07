import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Skeleton, Table, Typography, Divider, Badge } from "antd";
import * as actions from "../store/actions/posts";
import Hoc from "../hoc/hoc"; // higher order components

const { Title, Paragraph, Text } = Typography;

class PostList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.props.getPosts(user.token, user.username, user.is_company);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.props.getPosts(user.token, user.username, user.is_company);
      }
    }
  }

  renderEditButton(post) {
    return (
      <Hoc>
        {this.props.is_company ? (
          <Hoc>
            <Link to={`/posts/${post.id}`}>
              <Button style={{ marginBottom: "5px" }} icon="edit">
                Edit
              </Button>
            </Link>
            <br />
            <Link to={`/qa/${post.id}`}>
              <Button style={{ marginTop: "5px" }} icon="question">
                Answer Questions
              </Button>
            </Link>
          </Hoc>
        ) : (
          <Link to={`/posts/${post.id}`}>
            <Button icon="right" />
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

            <Title level={3}>For Student</Title>
            <Paragraph>Please click on "Student Login" on the left</Paragraph>

            <Title level={3}>For Companies/Corporates</Title>
            <Paragraph>
              Please click on "Company Login" on the left. If this is your first
              time using this site, please register an account by clicking the
              SignUp button after clicking "Company Login" on the left
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
        ) : (
          <div>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Hoc>
                <Divider orientation="left">
                  {this.props.is_company
                    ? "Your Posted Project(s)"
                    : "Projects"}
                </Divider>
                <Table columns={columns} dataSource={this.props.posts} />
              </Hoc>
            )}
          </div>
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
    getPosts: (token, username, is_company) =>
      dispatch(actions.getPosts(token, username, is_company))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
