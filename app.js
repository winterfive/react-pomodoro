// Pomodoro Clock
// Lee Gainer
// March 2019

let currentSession = 0;
let currentBreak = 0;
let isPaused = false;
let isSessionRunning = false;
let isBreakRunning = false;
let startSession = 0;
let startBreak = 0;

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
    if (!isSessionRunning) {
      isSessionRunning = true;
      
      // start session
      currentSession = this.state.sessionLength * 60;
      startSession = setInterval(this.runTimer, 1000);
    }
  }  

  runTimer() {
    // Change this to handle both currentSession and currentBreak values
    if (isSessionRunning) {
      function start () {
        console.log("got to here");
        displayCountdown(currentSession);  // ISSUE not calling this method
        console.log("got to here");
      }     
      
      // Display 00:00
      if(currentSession - 1 < 0) {
        clearInterval(startSession);
        // start break
      }
      currentSession -= 1;
      console.log("currSess: " + currentSession);
    }
  }  

  displayCountdown(amount) {
    console.log("got to display");
    if (amount < 600) {
      // if less than 10 minutes
      if (amount % 60 > 9) {
        // 10 seconds or more
        this.setState({
          timeLeft: "0" + Math.floor(amount / 60) + ":" + amount % 60
        });
      } else {
        // 9 seconds or less
        this.setState({
          timeLeft: "0" + Math.floor(amount / 60) + ":" + "0" + amount % 60
        });
      }
    } else {
      // if more than 10 minutes
      if (amount % 60 > 9) {
        // 10 seconds or more
        this.setState({
          timeLeft: Math.floor(amount / 60) + ":" + amount % 60
        });
      } else {
        // 9 seconds or less
        this.setState({
          timeLeft: Math.floor(amount / 60) + ":" + "0" + amount % 60
        });
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
    });
    currentSession = 0;
    currentBreak = 0;
    isPaused = false;
    isSessionRunning = false;
    isBreakRunning = false;
    
    if (isSessionRunning) {
      clearInterval(startSession);
      console.log("session cleared");
    }

    if (isBreakRunning) {
      clearInterval(startBreak);
      console.log("break cleared");
    }
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

