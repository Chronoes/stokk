function createGenericErrorHandler(errorHandlerFunction) {
  return response => {
    if (response instanceof Error) {
      errorHandlerFunction(response.message);
    } else {
      if (response.data.message) {
        errorHandlerFunction(response.data.message);
      } else {
        errorHandlerFunction('Something went wrong. Please try again.');
      }
    }
  };
}

export default createGenericErrorHandler;
