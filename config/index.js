// export const PORT = 8001;
module.exports = {
  PORT: process.env.PORT || 8001,
  ADMIN: {
    email: "admin",
    password: 123456,
  },
  USER: {
    emai: "user",
    password: 123456,
  },
};
