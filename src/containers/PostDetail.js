import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Divider,
  Typography,
  Icon,
  Collapse,
  Button,
  Input,
  notification
} from "antd";
import { getPostDetail } from "../store/actions/posts";
import { withRouter } from "react-router-dom";

import Hoc from "../hoc/hoc";
import PostForm from "./PostForm";
import { storage } from "../firebase";
import firebase from "../firebase";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlList: [],
      fileList: (this.props.currentPost.files + "").split(","),
      didUpdate: 0,
      my_questions: {},
      my_question: ""
    };
  }

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPostDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPost !== prevProps.currentPost) {
      console.log(this.props.currentPost);
      for (let filename of (this.props.currentPost.files + "").split(",")) {
        console.log(filename);
        storage
          .ref(
            this.props.currentPost.company + "/" + this.props.currentPost.title
          )
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ urlList: [...this.state.urlList, url] });
          })
          .catch(err => {});
      }
      firebase
        .database()
        .ref(
          `${this.props.currentPost.company}/${this.props.currentPost.title}`
        )
        .once("value", snapshot => {
          console.log(snapshot.val());
          this.setState({ my_questions: snapshot.val() });
        });
      this.setState({
        fileList: (this.props.currentPost.files + "").split(",")
      });
      this.forceUpdate();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPostDetail(newProps.token, this.props.match.params.id);
      }
    }
    if (this.props.currentPost) {
      console.log(this.props.currentPost);
      this.setState({ urlList: [] });
      for (let filename of (this.props.currentPost.files + "").split(",")) {
        console.log(filename);
        storage
          .ref(this.props.currentPost.company + "")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ urlList: [...this.state.urlList, url] });
          })
          .catch(err => {});
      }
      firebase
        .database()
        .ref(
          `${this.props.currentPost.company}/${this.props.currentPost.title}`
        )
        .once("value", snapshot => {
          this.setState({ my_questions: snapshot.val() });
        });
    }
  }

  render() {
    if (!this.props.error && this.props.token === null) {
      this.props.history.push("/");
    }

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

    const Panel = Collapse.Panel;

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

            <Form.Item {...formItemLayout} label="Files">
              {this.state.fileList.length >= 1 ? (
                <Hoc>
                  <Icon
                    type={
                      this.state.fileList[0].indexOf("pdf") >= 0
                        ? "file-pdf"
                        : this.state.fileList[0].indexOf("ppt") >= 0
                        ? "file-ppt"
                        : "file-text"
                    }
                  />{" "}
                  <a href={this.state.urlList[0]} target="_blank">
                    {this.state.fileList[0]}
                  </a>
                  <br />
                </Hoc>
              ) : (
                <span> </span>
              )}

              {this.state.fileList.length >= 2 ? (
                <Hoc>
                  <Icon
                    type={
                      this.state.fileList[1].indexOf("pdf") >= 0
                        ? "file-pdf"
                        : this.state.fileList[1].indexOf("ppt") >= 0
                        ? "file-ppt"
                        : "file-text"
                    }
                  />{" "}
                  <a href={this.state.urlList[1]} target="_blank">
                    {this.state.fileList[1]}
                  </a>
                  <br />
                </Hoc>
              ) : (
                <span> </span>
              )}

              {this.state.fileList.length >= 3 ? (
                <Hoc>
                  <Icon
                    type={
                      this.state.fileList[2].indexOf("pdf") >= 0
                        ? "file-pdf"
                        : this.state.fileList[2].indexOf("ppt") >= 0
                        ? "file-ppt"
                        : "file-text"
                    }
                  />{" "}
                  <a href={this.state.urlList[2]} target="_blank">
                    {this.state.fileList[2]}
                  </a>
                  <br />
                </Hoc>
              ) : (
                <span> </span>
              )}

              {this.state.fileList.length >= 4 ? (
                <Hoc>
                  <Icon
                    type={
                      this.state.fileList[3].indexOf("pdf") >= 0
                        ? "file-pdf"
                        : this.state.fileList[3].indexOf("ppt") >= 0
                        ? "file-ppt"
                        : "file-text"
                    }
                  />{" "}
                  <a href={this.state.urlList[3]} target="_blank">
                    {this.state.fileList[3]}
                  </a>
                  <br />
                </Hoc>
              ) : (
                <span> </span>
              )}

              {this.state.fileList.length === 5 ? (
                <Hoc>
                  <Icon
                    type={
                      this.state.fileList[4].indexOf("pdf") >= 0
                        ? "file-pdf"
                        : this.state.fileList[4].indexOf("ppt") >= 0
                        ? "file-ppt"
                        : "file-text"
                    }
                  />{" "}
                  <a href={this.state.urlList[4]} target="_blank">
                    {this.state.fileList[4]}
                  </a>
                </Hoc>
              ) : (
                <span> </span>
              )}
            </Form.Item>

            <Divider orientation="left">Contact Information</Divider>

            <Form.Item {...formItemLayout} label="Name">
              <Text>{this.props.currentPost.name}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="email">
              <Text>{this.props.currentPost.email}</Text>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Website">
              <a href={this.props.currentPost.website}>
                {this.props.currentPost.website}
              </a>
            </Form.Item>
            <Divider orientation="left">FAQ</Divider>
            {this.state.my_questions ? (
              <Form.Item {...formItemLayout} label="Questions">
                <Collapse bordered={false}>
                  {Object.keys(this.state.my_questions).map(key => (
                    <Panel header={key}>{this.state.my_questions[key]}</Panel>
                  ))}
                </Collapse>
              </Form.Item>
            ) : (
              <br />
            )}

            <Divider orientation="left">Ask a Question</Divider>
            <Form.Item>
              <Input.TextArea
                rows={2}
                value={this.state.my_question}
                onChange={e => {
                  this.setState({
                    my_question: e.target.value
                  });
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  this.state.my_questions[this.state.my_question] = "";
                  this.setState({
                    my_questions: this.state.my_questions
                  });
                  firebase
                    .database()
                    .ref(
                      `${this.props.currentPost.company}/${
                        this.props.currentPost.title
                      }`
                    )
                    .update(JSON.parse(`{"${this.state.my_question}" : ""}`))
                    .then(() => {
                      notification["success"]({
                        message: "Question successfully posted",
                        description: `Your question "${
                          this.state.my_question
                        }" was successfully posted`
                      });
                      this.setState({
                        my_question: ""
                      });
                    })
                    .catch(err =>
                      notification["error"]({
                        message: "An error occured",
                        description: err
                      })
                    );
                }}
              >
                Answer
              </Button>
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
