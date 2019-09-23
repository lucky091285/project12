const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/', (req, res)=> {
  res.send(users);
});

usersRouter.patch('/:name', (req, res)=> {
  res.send(users);
});

usersRouter.get('/:id', (req, res) => {
  const idin  = req.params.id;
  const user = users.find(user => user._id === idin);
  if (!user) {
        res.status(404).send({ error: "Нет пользователя с таким id" });
        return;
    }
    res.send(user);
});


module.exports = usersRouter;