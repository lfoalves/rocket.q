const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()

    const pass = req.body.lpassword
    let roomId
    let isRoom = true

    /* verificar se a senha é vazia ou zero | FORM CRIAR SALA*/
    if (pass == 0 || pass == '') {
      res.render('parts/404-senha')
    } else {
      while (isRoom) {
        /* Gera o número da sala */
        for (var i = 0; i < 6; i++) {
          i == 0
            ? (roomId = Math.floor(Math.random() * 10).toString())
            : (roomId += Math.floor(Math.random() * 10).toString())
        }
        /* verifica se esse número já existe */
        const roomsExistIds = await db.all(`SELECT id FROM rooms`)
        isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

        if (!isRoom) {
          /* inseri a sala no banco de dados */
          await db.run(`INSERT INTO rooms (
            id,
            pass
          ) VALUES (
            ${parseInt(roomId)},
            ${pass}
          )`)
        }
      }

      console.log(`id = ${parseInt(roomId)}, senha = ${pass}`)

      await db.close()

      res.redirect(`/room/${roomId}`)
    }
  },

  //Id open Sala
  async open(req, res) {
    const db = await Database()

    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )

    let isNoQuestions

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions
    })
  },

  async enter(req, res) {
    const db = await Database()
    let roomId = req.body.codRoomID

    /* verificar se a sala existe | FORM ENTRAR SALA */
    const roomsExistIds = await db.all(`SELECT id FROM rooms`)
    isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

    console.log(roomId)
    console.log(roomsExistIds)

    if (roomId == 0 || roomId == '') {
      res.render('parts/404-sala')
    } else {
      db.close()
      res.redirect(`/room/${roomId}`)
    }
  }
}
