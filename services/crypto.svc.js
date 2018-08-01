var bcrypt = require('bcrypt');

class CryptoService {

  hashPwd(password) {
    return bcrypt.hashSync(password, 2);
  }

  comparePwd(plainText, hashedPwd) {
    return bcrypt.compareSync(plainText, hashedPwd);
  }

}

module.exports = new CryptoService()