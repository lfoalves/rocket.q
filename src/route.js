const express = require('express')
const questionController = require('./controllers/question-controller')
const roomController = require('./controllers/room-controller')

const route = express.Router()

route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
route.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)
/*Rota da Sala*/
//route.get('/room/:room', (req, res) => res.render('room'))
route.get('/room/:room', roomController.open)

//Formato que o formulário dentro da modal tem que passar a informação
/*route.get('/room/:room/:question/:action', (req, res) =>
  res.render('exemplo', { req })
)*/

/* FORMULÁRIO DA MODAL */
route.post('/question/:room/:question/:action', questionController.index)

/* FORMULÁRIO CRIAR SALA */
route.post('/create-room', roomController.create)
/* FORMULÁRIO ENTRAR NA SALA */
route.post('/enter_room', roomController.enter)

/*form de inserir a pergunta no inicio da sala*/
route.post('/question/create/:room', questionController.create)

module.exports = route
