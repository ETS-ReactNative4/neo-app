import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";

class Info {
  @observable
  _info = {
    icon: { uri: constants.dialogBoxIcon },
    title: "",
    message: "",
    isVisible: false
  };

  @observable
  _error = {
    icon: { uri: constants.dialogBoxIcon },
    title: "",
    message: "",
    isVisible: false
  };

  @observable
  _success = {
    icon: { uri: constants.dialogBoxIcon },
    title: "",
    message: "",
    isVisible: false
  };

  @action
  setInfo = (title, message, icon = { uri: constants.dialogBoxIcon }) => {
    setTimeout(() => {
      this._info = { title, message, icon, isVisible: true };
    }, 300);
  };

  @action
  resetInfo = () => {
    this._info = {
      icon: { uri: constants.dialogBoxIcon },
      title: "",
      message: "",
      isVisible: false
    };
  };

  @computed
  get info() {
    return toJS(this._info);
  }

  @action
  setError = (title, message, icon = { uri: constants.dialogBoxIcon }) => {
    setTimeout(() => {
      this._error = { title, message, icon, isVisible: true };
    }, 300);
  };

  @action
  resetError = () => {
    this._error = {
      icon: { uri: constants.dialogBoxIcon },
      title: "",
      message: "",
      isVisible: false
    };
  };

  @computed
  get error() {
    return toJS(this._error);
  }

  @action
  setSuccess = (title, message, icon = { uri: constants.dialogBoxIcon }) => {
    setTimeout(() => {
      this._success = { title, message, icon, isVisible: true };
    }, 300);
  };

  @action
  resetSuccess = () => {
    this._success = {
      icon: { uri: constants.dialogBoxIcon },
      title: "",
      message: "",
      isVisible: false
    };
  };

  @computed
  get success() {
    return toJS(this._success);
  }
}

export default Info;
