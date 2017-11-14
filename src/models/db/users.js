const db = require('./db')

const addUser = function(user){
  return db.one(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      email,
      password
    ])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.addUser',
                     arguments: arguments});
      throw error
    });
  };


  const getUser = function(user){
    return db.one(`
      SELECT email, password
      FROM users
      WHERE email = $1
      `,
      [
        email
      ])
      .catch(error => {
        console.error({message: 'Error occurred while executing users.getUser',
                       arguments: arguments});
        throw error
      });
    };

    module.exports = {
      addUser,
      getUser
    }
