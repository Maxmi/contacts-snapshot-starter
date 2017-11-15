const db = require('./db')

const addUser = function(email, password){
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
      // console.log(error);
      console.error({message: 'Error occurred while executing users.addUser',
                     arguments: arguments});
      throw error
    });
  };


  const getUser = function(email, password){
    return db.one(`
      SELECT email, password
      FROM users
      WHERE email = $1
      `,
      [
        email, password
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
