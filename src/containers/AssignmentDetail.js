import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { getAssignmentDetail } from "../store/actions/assignments";
import { Link, withRouter } from "react-router-dom";

import Hoc from "../hoc/hoc";

class AssignmentDetail extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getAssignmentDetail(
        this.props.token,
        this.props.match.params.id
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getAssignmentDetail(
          newProps.token,
          this.props.match.params.id
        );
      }
    }
  }
  render() {
    const { title } = this.props.currentAssignment;
    return (
      <Hoc>
        {Object.keys(this.props.currentAssignment).length > 0 ? (
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
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssignmentDetail: (token, id) => dispatch(getAssignmentDetail(token, id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AssignmentDetail)
);
