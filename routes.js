const router = require('express').Router();

const users = require('./data/users.json');

const cards = require('./data/cards.json');

router.get('/users', (req, res)=> {
  res.send(users);
});

router.get('/cards', (req, res)=> {
  res.send(cards);
});

router.get('/users/:id', (req, res) => {
  const idin  = req.params.id;
  const user = users.find(user => user._id === idin);
  if (!user) {
        res.status(404).send({ error: "Нет пользователя с таким id" });
        return;
    }
    res.send(user);
});


module.exports = router;