const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkID 






exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',

    length: users.length,
    data: {
      users,
    },
  });
};

//Create users request type POST
exports.createUser = (req, res) => {
  const newId = uuidv4();
  const newUser = Object.assign({ _id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      res.status(202).json({
        status: 'success',

        data: {
          message: 'user has been created',
          user: newUser
        },
      });
    }
  );
};

exports.getSingleUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'not found',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateSingleUser = (req, res) => {
  const id = req.params.id;
  const findUser = users.find((el) => el._id === id);
  if (!findUser) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'user not found',
        address: 'update user',
      },
    });
  }
  const updatedUser = Object.assign(findUser, {
    active: 'false',
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          changedAt: req.requestTime,
          user: updatedUser,
        },
      });
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const findDeleteUser = users.findIndex((el) => el.id === id);

  if (!findDeleteUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
      address: 'delete',
    });
  }

  users.splice(findDeleteUser, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'user has been deleted',
        },
      });
    }
  );
};
