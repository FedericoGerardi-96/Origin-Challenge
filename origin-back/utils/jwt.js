const jwt = require("jsonwebtoken");

const signToken = (id, email) => {
  return jwt.sign(
    // payload
    { id, email },

    // Seed
    "este-es-el-seed",

    // Opciones
    { expiresIn: "30d" }
  );
};

const isValidToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, "este-es-el-seed", (err, payload) => {
        if (err) return reject("JWT no es válido");

        const { id } = payload;
        resolve(id);
        
      });
    } catch (error) {
      reject("JWT no es válido");
    }
  });
};

module.exports = { isValidToken, signToken };
