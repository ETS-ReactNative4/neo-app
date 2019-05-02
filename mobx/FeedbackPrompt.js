import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { logError } from "../Services/errorLogger/errorLogger";

class FeedbackPrompt {}

export default FeedbackPrompt;
