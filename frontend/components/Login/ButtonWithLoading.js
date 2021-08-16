import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";

class ButtonWithLoading extends React.Component {
  state = {
    loadings: false,
  };

  enterLoading = (index) => {
    this.setState({ loadings: index });
  };

  render() {
    const { loadings } = this.state;
    const prop = this.props.elms;
    return (
      <>
        <Button
          htmlType="submit"
          className="btn"
          icon={<ArrowRightOutlined />}
          loading={loadings}
          onClick={() => this.enterLoading(prop.status)}
        >
          {prop.name}
        </Button>
      </>
    );
  }
}

export default ButtonWithLoading;
