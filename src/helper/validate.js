const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  //   else
  //   if (!validator.isStrongPassword(password)) {
  //     throw new Error("Please enter a strong password");
  //   }
};

const validateUserEditData = (req) => {
  const allowUserToEdits = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];

  const isEditallowed = Object.keys(req.body).every((field) =>
    allowUserToEdits.includes(field)
  );

  return isEditallowed;
};

module.exports = { validateSignupData, validateUserEditData };
