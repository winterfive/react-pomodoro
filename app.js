// Pomodoro Clock
// Lee Gainer
// March 2019

let currentSession = 0;
let currentBreak = 0;
let isPaused = false;
let isSessionRunning = false;
let isBreakRunning = false;
let startSession;
let startBreak;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      startStopLabel: "Start",
      timeLeft: "00:00",
      timeLabel: "Session Time: "
    };
  }

  // Updates session and break count prop
  // string, string => void
  updateCount(x, y) {
    let z = 0;
    // update sessionLength
    if (x === "session") {
      z = this.state.sessionLength;

      if (y === "-") {
        // subtract 1, sessionLength must be 1 or more
        if (z - 1 >= 1) {
          z -= 1;
        } else {
          alert("Session length must be greater than 0.");
        }
      } else {
        // add 1, count must be less than 61
        if (z + 1 <= 60) {
          z += 1;
        } else {
          alert("Session length cannot exceed 60 minutes.");
        }
      }
      this.setState({
        sessionLength: z
      });
      // update breakLength
    } else {
      z = this.state.breakLength;

      if (y === "-") {
        // subtract 1, breakLength must be 1 or more
        if (z - 1 >= 1) {
          z -= 1;
        } else {
          alert("Break length must be greater than 0.");
        }
      } else {
        // add 1, count must be less than 61
        if (z + 1 <= 60) {
          z += 1;
        } else {
          alert("Break length cannot exceed 60 minutes.");
        }
      }
      this.setState({
        breakLength: z
      });
    }
  }

  // Starts and stops timer
  // void -> void
  controlTimer() {
    // pause button
    if ((!isPaused && isSessionRunning) || (!isPaused && isBreakRunning)) {
      isPaused = true;
      if (isSessionRunning) {
        clearInterval(startSession);
        return;
      }
      if (isBreakRunning) {
        clearInterval(startBreak);
        return;
      }
    }

    // restarting session or break
    if (isPaused) {
      if (isSessionRunning) {
        //restart session
        startSession = setInterval(function() {
          runTimer();
        }, 1000);
      }

      if (isBreakRunning) {
        //restart break
        startBreak = setInterval(function() {
          runTimer();
        }, 1000);
      }
      isPaused = false;
      this.setState({
        startStop: "Stop"
      });
    }

    // Starting a new session
    if (!isSessionRunning && !isBreakRunning) {
      currentSession = this.state.sessionLength * 60;
      isSessionRunning = true;
      startSession = setInterval(function() {
        runTimer();
      }, 1000);
      this.setState({
        startStop: "Stop"
      });
    }
  }

  runTimer() {
    if (isSessionRunning) {
      sessCount -= 1;
      displayCountdown(currentSession);
    }

    if (isBreakRunning) {
      breakCount -= 1;
      displayCountdown(currentBreak);
    }

    if (currentSession === 0 || currentBreak === 0) {
      playAudio();
      if (isSessionRunning) {
        // stop session, start break
        clearInterval(startSession);
        currentSession = this.state.sessionLength * 60;
        currentBreak = this.state.sessionLength * 60;
        this.setState({
          timeLabel: "Break Time: "
        });
        startBreak = setInterval(function() {
          runTimer();
        }, 1000);
        isSessionRunning = false;
        isBreakRunning = true;
      } else {
        // stop break, start session
        clearInterval(startBreak);
        currentSession = this.state.sessionLength * 60;
        currentBreak = this.state.sessionLength * 60;
        this.setState({
          timeLabel: "Session Time: "
        });
        startSession = setInterval(function() {
          runTimer();
        }, 1000);
        isSessionRunning = true;
        isBreakRunning = false;
      }
    }
  }
  
  displayCountdown(amount) {
    if (amount < 600) {
      // if less than 10 minutes
      if (amount % 60 > 9) {
        // 10 seconds or more
        this.setState({
          timeLeft: "0" + Math.floor(amount / 60) + ":" + amount % 60
        })
      } else {
        // 9 seconds or less
        this.setState({
          timeLeft: "0" + Math.floor(amount / 60) + ":" + "0" + amount % 60
        })
      }
    } else {
      // if more than 10 minutes
      if (amount % 60 > 9) {
        // 10 seconds or more

        this.setState({
          timeLeft: Math.floor(amount / 60) + ":" + amount % 60
        })
      } else {
        // 9 seconds or less
        this.setState({
          timeLeft: Math.floor(amount / 60) + ":" + "0" + amount % 60
        })
      }
    }
  }
  
  reset() {
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      startStopLabel: "Start",
      timeLeft: "00:00",
      timeLabel: "Session Time: "
    })
    let currentSession = 0;
    let currentBreak = 0;
    let isPaused = false;
    let isSessionRunning = false;
    let isBreakRunning = false;
  }

  render() {
    return (
      <div>
        <div id="circleBg">
          <h1>Pomodoro Clock</h1>
          <div id="sessionDiv" class="centerRow">
            <h2 id="session-label" class="title">
              Session Length
            </h2>
            <a
              href="#"
              id="session-decrement"
              class="btn"
              onClick={() => this.updateCount("session", "-")}
            >
              -
            </a>
            <p id="session-length">{this.state.sessionLength}</p>
            <a
              href="#"
              id="session-increment"
              class="btn"
              onClick={() => this.updateCount("session", "+")}
            >
              +
            </a>
          </div>
          <div id="breakDiv" class="centerRow">
            <h2 id="break-label" class="title">
              Break Length
            </h2>
            <a
              href="#"
              id="break-decrement"
              class="btn"
              onClick={() => this.updateCount("break", "-")}
            >
              -
            </a>
            <p id="break-length">{this.state.breakLength}</p>
            <a
              href="#"
              id="break-increment"
              class="btn"
              onClick={() => this.updateCount("break", "+")}
            >
              +
            </a>
          </div>
          <div id="timerDiv" class="centerRow">
            <h2 id="timer-label">
              {this.state.timeLabel}
              <span id="time-left">{this.state.timeLeft}</span>
            </h2>
          </div>
          <div class="centerRow">
            <a
              href="#"
              id="start_stop"
              class="btn"
              onClick={() => this.controlTimer()}
            >
              {this.state.startStopLabel}
            </a>
            <a href="#" id="reset" class="btn" onClick={() => this.reset()}>
              Reset
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
