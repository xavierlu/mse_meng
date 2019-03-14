import React from "react";
import { connect } from "react-redux";
import { List, Form, Avatar, Input, Card, Button } from "antd";
import * as actions from "../store/actions/posts";

import Hoc from "../hoc/hoc";

const data = [
  {
    title: "Where is it located 1"
  },
  {
    title: "Where is it located 2"
  },
  {
    title: "How much is the stipend"
  },
  {
    title: "Where is it located 4"
  }
];

class QA extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;

    return (
      <Hoc>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.title}
                description="A more detailed description of my question asked above "
              />
            </List.Item>
          )}
        />

        <Card title="Ask a Question">
          <div style={{ margin: "24px 0" }} />

          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Note">
              {getFieldDecorator("note", {
                rules: [{ required: true, message: "Please input your note!" }]
              })(
                <TextArea
                  placeholder="Autosize height based on content lines"
                  autosize
                />
              )}
            </Form.Item>
            <Form.Item label="Note">
              {getFieldDecorator("note", {
                rules: [{ required: true, message: "Please input your note!" }]
              })(
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Hoc>
    );
  }
}

const WrappedQA = Form.create({ name: "q&a" })(QA);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedQA);
