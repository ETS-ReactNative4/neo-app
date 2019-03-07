import React, { Component } from "react";
import { storiesOf } from "@storybook/react-native";
import ForexProviderInfo from "../../Screens/ForexScreen/Components/ForexProviderInfo";
import ForexFeatureLineItem from "../../Screens/ForexScreen/Components/ForexFeatureLineItem";
import ForexFeaturesList from "../../Screens/ForexScreen/Components/ForexFeaturesList";
import ForexInputField from "../../Screens/ForexScreen/Components/ForexInputField";

const features = [
  "Easy Top Up Forex Card on trip.",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money",
  "Easy Top Up Forex Card on trip.",
  "Easy Top Up Forex Card on trip.",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money"
];

class ForexInputWrapper extends Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onEdit = value => {
    this.setState({ value });
  };

  render() {
    return (
      <ForexInputField
        value={this.state.value}
        onEdit={this.onEdit}
        label={"Name"}
      />
    );
  }
}

storiesOf("Forex Story", module)
  .add("Forex Provider Info", () => {
    const props = {};
    console.log(props);
    return <ForexProviderInfo {...props} />;
  })
  .add("Forex Feature Line Item", () => {
    const props = {
      item: features[0]
    };
    console.log(props);
    return <ForexFeatureLineItem {...props} />;
  })
  .add("Forex Feature Line Item multilines", () => {
    const props = {
      item: features[1]
    };
    console.log(props);
    return <ForexFeatureLineItem {...props} />;
  })
  .add("Forex Features List", () => {
    const props = {
      features
    };
    console.log(props);
    return <ForexFeaturesList {...props} />;
  })
  .add("Forex Input field", () => {
    const props = {};
    console.log(props);
    return <ForexInputWrapper {...props} />;
  });
