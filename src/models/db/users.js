const db = require('./db');

/**
 * saves newly registered user id db
 * @param {string} email    [provided by user at registration]
 * @param {string} password [provided by user at registration]
 */
const addUser = (email, password) => {
  return db.one(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `,
    [
      email, password
    ])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.addUser',
        arguments: arguments});
      throw error;
    });
};

/**
 * retrieves user from db
 * @param  {string} email    [privided by user at login]
 * @param  {string} password [privided by user at login]
 * @return {object}          [user with email, password and role properties]
 */
const getUser = (email, password) => {
  return db.one(`
      SELECT email, password, role
      FROM users
      WHERE email = $1
      `,
    [
      email, password
    ])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.getUser',
        arguments: arguments});
      throw error;
    });
};

module.exports = {
  addUser,
  getUser
};
