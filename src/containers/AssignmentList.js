import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Skeleton, Icon } from "antd";
import * as actions from "../store/actions/assignments";
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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class AssignmentList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getAssignments(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getAssignments(newProps.token);
      }
    }
  }

  renderItem(item) {
    return (
      <Link to="/assignments/1">
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  render() {
    return (
      <Hoc>
        {this.props.token === undefined || this.props.token === null ? (
          <div>please login in first</div>
        ) : (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3
                }}
                dataSource={this.props.assignments}
                renderItem={item => this.renderItem(item)}
              />
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
    assignments: state.assignments.assignments,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssignments: token => dispatch(actions.getAssignments(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);
