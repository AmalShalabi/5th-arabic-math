import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
  }

  connect(gameId, userType = 'student', userName = null) {
    // For demo purposes, we'll use a mock WebSocket
    // In production, you'd connect to your actual Socket.IO server
    this.socket = {
      emit: (event, data) => {
        console.log(`Socket emit: ${event}`, data)
        // Simulate server response
        setTimeout(() => {
          this.handleMockResponse(event, data)
        }, 100)
      },
      on: (event, callback) => {
        console.log(`Socket listening: ${event}`)
        this.mockListeners = this.mockListeners || {}
        this.mockListeners[event] = callback
      },
      off: (event) => {
        console.log(`Socket stop listening: ${event}`)
        if (this.mockListeners) {
          delete this.mockListeners[event]
        }
      },
      disconnect: () => {
        console.log('Socket disconnected')
        this.isConnected = false
      }
    }

    this.isConnected = true
    this.gameId = gameId
    this.userType = userType
    this.userName = userName

    // Simulate connection success
    setTimeout(() => {
      this.emit('join-game', {
        gameId,
        userType,
        userName,
        timestamp: Date.now()
      })
    }, 500)

    return this.socket
  }

  handleMockResponse(event, data) {
    const listeners = this.mockListeners || {}
    
    switch (event) {
      case 'join-game':
        if (listeners['game-joined']) {
          listeners['game-joined']({
            success: true,
            gameId: this.gameId,
            message: 'تم الانضمام للعبة بنجاح'
          })
        }
        break
        
      case 'student-join':
        if (listeners['student-joined'] && this.userType === 'teacher') {
          listeners['student-joined']({
            studentId: data.studentId || Math.random(),
            studentName: data.studentName,
            timestamp: Date.now()
          })
        }
        break
        
      case 'start-game':
        if (listeners['game-started']) {
          listeners['game-started']({
            gameId: this.gameId,
            message: 'بدأت اللعبة!'
          })
        }
        break
        
      case 'end-game':
        if (listeners['game-ended']) {
          listeners['game-ended']({
            gameId: this.gameId,
            message: 'انتهت اللعبة!'
          })
        }
        break
        
      case 'submit-answer':
        if (listeners['answer-result'] && this.userType === 'student') {
          listeners['answer-result']({
            correct: data.answerIndex === data.correctAnswer,
            points: data.answerIndex === data.correctAnswer ? Math.max(100, data.timeLeft * 10) : 0,
            totalScore: data.totalScore || 0
          })
        }
        break
        
      case 'get-leaderboard':
        if (listeners['leaderboard-update']) {
          listeners['leaderboard-update']({
            leaderboard: [
              { id: 1, name: 'أحمد محمد', score: 850, rank: 1 },
              { id: 2, name: 'فاطمة علي', score: 720, rank: 2 },
              { id: 3, name: 'محمد أحمد', score: 680, rank: 3 },
              { id: 4, name: 'سارة خالد', score: 590, rank: 4 }
            ]
          })
        }
        break
    }
  }

  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data)
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  // Game-specific methods
  joinGame(gameId, userName) {
    this.emit('student-join', {
      gameId,
      studentName: userName,
      studentId: Date.now(),
      timestamp: Date.now()
    })
  }

  startGame(gameId, settings = {}) {
    this.emit('start-game', {
      gameId,
      settings,
      timestamp: Date.now()
    })
  }

  endGame(gameId) {
    this.emit('end-game', {
      gameId,
      timestamp: Date.now()
    })
  }

  submitAnswer(gameId, questionId, answerIndex, timeLeft, correctAnswer, totalScore) {
    this.emit('submit-answer', {
      gameId,
      questionId,
      answerIndex,
      timeLeft,
      correctAnswer,
      totalScore,
      timestamp: Date.now()
    })
  }

  getLeaderboard(gameId) {
    this.emit('get-leaderboard', {
      gameId,
      timestamp: Date.now()
    })
  }
}

// Create a singleton instance
const socketService = new SocketService()
export default socketService
