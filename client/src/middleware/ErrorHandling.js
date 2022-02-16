export const ErrorHandling = (errorCode) => {
  const dictionary = {
    23503: "Failed to delete due to the resource being used in another table",
  };
  return dictionary[errorCode];
};
