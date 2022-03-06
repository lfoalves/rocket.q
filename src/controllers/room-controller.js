const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()

    const pass = req.body.lpassword
    let roomId
    let isRoom = true

    /* verifica se a senha é vazia | Criar Sala*/
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
        console.log(roomsExistIds)
        console.log(isRoom)
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

    /* verifica espaço de questões vazia */
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

  // enter(req, res) {
  //   /* verifica se o código da sala é vazio | Entrar Sala*/
  //   const codRoomId = req.body.codRoomId
  //   if (codRoomId == 0 || codRoomId == '') {
  //     res.render('parts/404-sala')
  //   } else {
  //     const roomId = req.body.roomId
  //
  //     res.redirect(`/room/${roomId}`)
  //   }
  //}

  async enter(req, res) {
    const db = await Database()

    let roomId = req.body.codRoomID

    /* verifica se esse número já existe */
    const roomsExistIds = await db.all(`SELECT id FROM rooms`)
    SalaExiste = roomsExistIds.some(roomExistId => roomExistId === roomId)

    console.log(roomsExistIds)
    console.log(SalaExiste)
    console.log(roomId)

    if (roomId == 0 || roomId == '') {
      roomId = 0
    }

    console.log(roomId)

    /* se a sala não existe redireciona para o Início */
    //

    /* verifica se o código da sala é vazio | Entrar Sala*/
    if (roomId == 0 || roomId == '') {
      if (roomsExistIds != roomId) {
        res.render('parts/404-sala')
      }
    } else {
      res.redirect(`/room/${roomId}`)
      await db.close()
    }
  }
}
