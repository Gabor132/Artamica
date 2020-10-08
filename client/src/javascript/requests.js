import axios from "axios";
import { RequestUIHandler } from "./request_ui_handler";
import store from "../store";

const RequestHandler = {};

export { RequestHandler };

// This is here to allow logging warnings and errors via the console
/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

// Set BaseURL
RequestHandler.getBaseUrl = function() {
  let baseUrl = process.env.VUE_APP_ROOT_API;
  return baseUrl;
};

RequestHandler.doGetRequest = async function(
  subUrl,
  params,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .get(RequestHandler.getBaseUrl() + subUrl, {
      params: params
    })
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, store.state);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, store.state);
    });
};

RequestHandler.doPostRequest = async function(
  subUrl,
  data,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .post(RequestHandler.getBaseUrl() + subUrl, data)
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, store.state);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, store.state);
    });
};

RequestHandler.doPutRequest = async function(
  subUrl,
  data,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .put(RequestHandler.getBaseUrl() + subUrl, data)
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, store.state);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, store.state);
    });
};

RequestHandler.doDeleteRequest = async function(
  subUrl,
  params,
  onSuccess,
  onFailure
) {
  if (typeof subUrl === undefined) {
    subUrl = "";
  }
  return await axios
    .delete(RequestHandler.getBaseUrl() + subUrl, {
      params: params
    })
    .then(response => {
      RequestUIHandler._getSuccessFunction(onSuccess, store.state);
      return response.data;
    })
    .catch(error => {
      RequestUIHandler._getFailureFunction(onFailure, error, store.state);
    });
};
