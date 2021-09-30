const catchError = (err, req, res, next) => {
  // handle error
  console.log("From err.js ", JSON.stringify(err, null, 2));
  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keysErr = Object.keys(errors);
    const errorObj = {};
    keysErr.map((key) => {
      errorObj[key] = errors[key].message;
    });
    err.statusCode = 400;
    err.message = errorObj;
  }

  // 500: Internal server error
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message || "Internal error!",
  });
};

module.exports = catchError;
