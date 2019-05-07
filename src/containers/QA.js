import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Form,
  Divider,
  Collapse,
  Input,
  Button,
  Skeleton,
  notification
} from "antd";
import firebase from "../firebase";
import { getPostDetail } from "../store/actions/posts";

import Hoc from "../hoc/hoc";

class QA extends React.PureComponent {
  state = {
    answers: [],
    my_questions: null,
    submitting: false
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPostDetail(this.props.token, this.props.match.params.id);
    }
    firebase
      .database()
      .ref(`${this.props.currentPost.company}/${this.props.currentPost.title}`)
      .once("value", snapshot => {
        this.setState({ my_questions: snapshot.val() });
      });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPostDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPost !== prevProps.currentPost) {
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

  uploadAnswer = (q, a) => {
    console.log(JSON.parse(`{"${q}" : "${a}"}`));
  };

  render() {
    const Panel = Collapse.Panel;

    const AnswerArea = ({ keey: q, placeholdAns }) => (
      <div>
        <Form.Item>
          <Input.TextArea
            rows={4}
            defaultValue={placeholdAns}
            onChange={e => {
              this.state.answers[q] = e.target.value;
              this.setState({
                answers: this.state.answers
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              firebase
                .database()
                .ref(
                  `${this.props.currentPost.company}/${
                    this.props.currentPost.title
                  }`
                )
                .update(JSON.parse(`{"${q}" : "${this.state.answers[q]}"}`))
                .then(() =>
                  notification["success"]({
                    message: "Question successfully answered",
                    description: `Your response for "${q}" was successfully updated`
                  })
                )
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
      </div>
    );

    const Test = ({ my_questions }) => {
      return (
        <Collapse bordered={false}>
          {Object.keys(my_questions).map(key => (
            <Panel header={key}>
              <AnswerArea keey={key} placeholdAns={my_questions[key]} />
            </Panel>
          ))}
        </Collapse>
      );
    };

    return (
      <div>
        {this.props.loading || this.state.my_questions === null ? (
          <Skeleton active />
        ) : (
          <Hoc>
            <Divider orientation="left">Questions From Students</Divider>

            <Test my_questions={this.state.my_questions} />
          </Hoc>
        )}
      </div>
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
  )(QA)
);
