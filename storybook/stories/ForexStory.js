import React, { Component } from "react";
import { storiesOf } from "@storybook/react-native";
import ForexProviderInfo from "../../Screens/ForexScreen/Components/ForexProviderInfo";
import ForexFeatureLineItem from "../../Screens/ForexScreen/Components/ForexFeatureLineItem";
import ForexFeaturesList from "../../Screens/ForexScreen/Components/ForexFeaturesList";
import ForexInputField from "../../Screens/ForexScreen/Components/ForexInputField";
import ForexSwitchComponent from "../../Screens/ForexScreen/Components/ForexSwitchComponent";
import ForexAmountField from "../../Screens/ForexScreen/Components/ForexAmountField";

const features = [
  "Easy Top Up Forex Card on trip.",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money",
  "Easy Top Up Forex Card on trip.",
  "Easy Top Up Forex Card on trip.",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money",
  "This plan includes the new Easy Top Up Forex Card on trip no need to worry about running out of money"
];

const forexOptions = [
  {
    label: "Cash",
    value: 0
  },
  {
    label: "Card",
    value: 1
  },
  {
    label: "Cash",
    value: 2
  },
  {
    label: "Card",
    value: 3
  },
  {
    label: "Cash",
    value: 4
  },
  {
    label: "Card",
    value: 5
  }
];

const currencyList = ["NZD", "EUR", "USD", "INR", "AUD"];

class ForexInputWrapper extends Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onEdit = value => this.setState({ value });

  render() {
    return (
      <ForexInputField
        value={this.state.value}
        onEdit={this.onEdit}
        placeholder={"Your Name..."}
        label={"Name"}
      />
    );
  }
}

class ForexMobileNumberWrapper extends Component {
  state = {
    value: "",
    ccode: "+91"
  };

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onEdit = value => this.setState({ value });

  selectCountryCode = ccode => this.setState({ ccode });

  render() {
    return (
      <ForexInputField
        isMobileNumberField={true}
        value={this.state.value}
        selectedCountryCode={this.state.ccode}
        onEdit={this.onEdit}
        placeholder={"Your Number..."}
        keyboardType={"phone-pad"}
        label={"Mobile Number"}
        onSelectCountryCode={this.selectCountryCode}
      />
    );
  }
}

class ForexSwitchWrapper extends Component {
  state = {
    selectedOption: 0
  };

  selectOption = selectedOption => this.setState({ selectedOption });

  render() {
    return (
      <ForexSwitchComponent
        label={"Product"}
        options={forexOptions}
        onSelect={this.selectOption}
        selectedValue={this.state.selectedOption}
      />
    );
  }
}

class ForexAmountWrapper extends Component {
  state = {
    amount: "",
    selectedCurrency: "INR"
  };

  onEditAmount = amount => this.setState({ amount });

  onSelectCurrency = selectedCurrency => this.setState({ selectedCurrency });

  render() {
    return (
      <ForexAmountField
        amount={this.state.amount}
        onEdit={this.onEditAmount}
        selectedCurrency={this.state.selectedCurrency}
        onSelectCurrency={this.onSelectCurrency}
        currencies={currencyList}
        label={"Amount"}
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
    return <ForexInputWrapper {...props} />;
  })
  .add("Forex Mobile Input field", () => {
    const props = {};
    return <ForexMobileNumberWrapper {...props} />;
  })
  .add("Forex Switch field", () => {
    return <ForexSwitchWrapper />;
  })
  .add("Forex Amount field", () => {
    return <ForexAmountWrapper />;
  });
