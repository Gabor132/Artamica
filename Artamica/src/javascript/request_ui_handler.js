const RequestUIHandler = {};

export { RequestUIHandler };

// This is here to allow logging warnings and errors via the console
/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
//
// Auxiliar to handle Responses and Errors from Axios
//
RequestUIHandler._genericRequestResponseHandler = function(storeState) {
  if (storeState !== undefined) {
    storeState.serviceResponseBar.showSnackbar = true;
    storeState.serviceResponseBar.isError = false;
    storeState.serviceResponseBar.error.status = "";
    storeState.serviceResponseBar.error.description = "Success";
  }
};

RequestUIHandler._getTokenRequestResponseHandler = function(storeState) {
  if (storeState !== undefined) {
    storeState.serviceResponseBar.showSnackbar = true;
    storeState.serviceResponseBar.isError = false;
    storeState.serviceResponseBar.error.status = "";
    storeState.serviceResponseBar.error.description = "Success";
  }
};

RequestUIHandler._genericRequestErrorHandler = function(error, storeState) {
  // TODO: Replace with error component
  if (storeState !== undefined) {
    storeState.serviceResponseBar.showSnackbar = true;
    storeState.serviceResponseBar.isError = true;
    if (typeof error.response !== undefined) {
      storeState.serviceResponseBar.error.status = error.response.status;
      if (
        error.response.statusText !== undefined &&
        error.response.statusText !== ""
      ) {
        storeState.serviceResponseBar.error.description =
          error.response.statusText;
      } else {
        storeState.serviceResponseBar.error.description =
          "Failed to retrieve data";
      }
    } else {
      storeState.serviceResponseBar.error.status = "";
      storeState.serviceResponseBar.error.description =
        "Failed to retrieve data";
    }
  }
};

RequestUIHandler._getSuccessFunction = function(onSuccess, storeState) {
  if (onSuccess === undefined) {
    return RequestUIHandler._genericRequestResponseHandler(storeState);
  }
  return onSuccess(storeState);
};

RequestUIHandler._getFailureFunction = function(onFailure, error, storeState) {
  if (onFailure === undefined) {
    return RequestUIHandler._genericRequestErrorHandler(error, storeState);
  }
  return onFailure(error, storeState);
};
