const ApiError = require("../utils/ApiError");

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    // console.log(roles);
    const role = req.user.role;
    if (!role || !roles.includes(role)) {
      throw new ApiError(403, "No permision");
    }
    next();
  };
