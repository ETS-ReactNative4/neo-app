import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";

class Info {
  @observable
  _info = {
    icon: constants.infoBoxIllus,
    title: "",
    message: "",
    isVisible: false,
    action: false,
    actionText: ""
  };

  @observable
  _error = {
    icon: constants.errorBoxIllus,
    title: "",
    message: "",
    isVisible: false,
    action: false,
    actionText: ""
  };

  @observable
  _success = {
    icon: constants.successBoxIllus,
    title: "",
    message: "",
    isVisible: false,
    action: false,
    actionText: ""
  };

  @action
  setInfo = (
    title,
    message,
    icon = constants.infoBoxIllus,
    actionText = "",
    action = false
  ) => {
    setTimeout(() => {
      this._info = {
        title,
        message,
        icon,
        isVisible: true,
        actionText,
        action
      };
    }, 300);
  };

  @action
  resetInfo = () => {
    this._info = {
      icon: constants.infoBoxIllus,
      title: "",
      message: "",
      isVisible: false,
      action: false,
      actionText: ""
    };
  };

  @computed
  get info() {
    return toJS(this._info);
  }

  @action
  setError = (
    title,
    message,
    icon = constants.errorBoxIllus,
    actionText = "",
    action = false
  ) => {
    setTimeout(() => {
      this._error = {
        title,
        message,
        icon,
        isVisible: true,
        actionText,
        action
      };
    }, 300);
  };

  @action
  resetError = () => {
    this._error = {
      icon: constants.errorBoxIllus,
      title: "",
      message: "",
      isVisible: false,
      action: false,
      actionText: ""
    };
  };

  @computed
  get error() {
    return toJS(this._error);
  }

  @action
  setSuccess = (
    title,
    message,
    icon = constants.successBoxIllus,
    actionText = "",
    action = false
  ) => {
    setTimeout(() => {
      this._success = {
        title,
        message,
        icon,
        isVisible: true,
        actionText,
        action
      };
    }, 300);
  };

  @action
  resetSuccess = () => {
    this._success = {
      icon: constants.successBoxIllus,
      title: "",
      message: "",
      isVisible: false,
      action: false,
      actionText: ""
    };
  };

  @computed
  get success() {
    return toJS(this._success);
  }
}

export default Info;
