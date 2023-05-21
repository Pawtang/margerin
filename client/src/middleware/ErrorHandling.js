export const errorHandling = (errorCode) => {
  const dictionary = {
    23000: "Integrity contraint violation",
    23001: "Restricted violation",
    23502: "Not null violation",
    23503: "Foreign key violation",
    23505: "Uniqueness violation",
    23514: "Check violation",
    "23P01": "Exclusion violation",
    42601: "Syntax error",
    42804: "Incorrect datatype",
    "08003": "No connection to database",
    "08006": "Connection failure",
    42804: "Incorrect datatype",
    22000: "Data exception",
  };
  if (!(errorCode in dictionary)) return `unknown error`;
  return dictionary[errorCode];
};
