// const dictionary = {
//   23000: "Integrity contraint violation",
//   23001: "Restricted violation",
//   23502: "Not null violation",
//   23503: "Foreign key violation",
//   23505: "Uniqueness violation",
//   23514: "Check violation",
//   "23P01": "Exclusion violation",
//   42601: "Syntax error",
//   42804: "Incorrect datatype",
//   "08003": "No connection to database",
//   "08006": "Connection failure",
//   22000: "Data exception",
// };

// res.status(400).json({
//   errorCode: error.code,
//   errorMessage: error.detail,
// })

const errorHandling = (error, req, res, next) => {
  console.log(error);
  console.log(error.code);
  return res.status(400).send(error.message);
};

module.exports = errorHandling;
