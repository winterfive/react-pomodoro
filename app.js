// Pomodoro Clock
// Lee Gainer
// March 2019

// Working on a non-Free Code Camp version of this app.
// The new version will have additional features and include
// a responsive UI.  

// TODO After 1st break, timer counts down by 2 (previous timer has not been exited)
// TODO Design is not responsive
// TODO Add animated countdown visual tbd

let currentSession = 0;
let currentBreak = 0;
let isPaused = false;
let isSessionRunning = false;
let isBreakRunning = false;
let startSession = 0;
let startBreak = 0;
const SESSION = 25;
const BREAK = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: SESSION,
      breakLength: BREAK,
      startStopLabel: "Start",
      timeLeft: "00:00",
      timeLabel: "Session Time: ",
    };
    
    this.updateCount = this.updateCount.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.displayCountdown = this.displayCountdown.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Updates session and break count prop
  // string, string => void
  updateCount(timerType, op) {
    let z = 0;
    // update sessionLength
    if (timerType === "session") {
      z = this.state.sessionLength;

      if (op === "-") {
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

      if (op === "-") {
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
  

  // Handles start/stop button click
  // void -> void
  controlTimer() {    
    // pause a session or break
    if(!isPaused && isSessionRunning || !isPaused && isBreakRunning) {
      isPaused = true;
      if (isSessionRunning) {
        clearInterval(startSession);
        return;
      }    
      if (isBreakRunning) {
        clearInterval(startBreak);
        return;
      }
      
      this.setState ({
        startStopLabel: "Start"
      })
    }    
    
    // restarting session or break
    if (isPaused) {
      if (isSessionRunning) {
        //restart session
        startSession = setInterval( () => this.runTimer(), 1000);
      }
      
      if (isBreakRunning) {
        //restart break
        startBreak = setInterval( () => this.runTimer(), 1000);
      }
      isPaused = false;
      
      this.setState ({
        startStopLabel: "Stop"
      })
    }
    
    // starting new session
    if (!isSessionRunning && !isPaused) {
      isSessionRunning = true;
      this.setState({
        startStopLabel: "Stop"
      })

      // start session
      currentSession = this.state.sessionLength * 60;
      startSession = setInterval( () => this.runTimer(), 1000);
    }
  }

  // Handles countdown and when session or break hits 0
  // void -> void 
  runTimer() {    
    if (isSessionRunning) {   
      this.displayCountdown(currentSession);
      currentSession -= 1;
      
      // Session hits 0: stop Session, start break
      if (currentSession < 0) {
        clearInterval(startSession);
        isSessionRunning = false;
        currentBreak = this.state.breakLength * 60;
        this.setState({
          timeLabel: "Break Time: "
        })
        startBreak = setInterval(() => this.runTimer(), 1000);        
        isBreakRunning = true;
        //this.audio.play();
      }
            
    }
    
    if (isBreakRunning) {
      this.displayCountdown(currentBreak);
      currentBreak -= 1;  
      // Break hits 0: stop break, start session
      if (currentBreak < 0) {
        clearInterval(startBreak);
        isBreakRunning = false;
        currentSession = this.state.sessionLength * 60;
        this.setState({
          timeLabel: "Session Time: "
        })
        startSession = setInterval(() => this.runTimer(), 1000);
        isSessionRunning = true;
        //this.audio.play();
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
      sessionLength: SESSION,
      breakLength: BREAK,
      startStopLabel: "Start",
      timeLeft: "00:00",
      timeLabel: "Session Time: "
    });
    currentSession = 0;
    currentBreak = 0;
    isPaused = false;
    isSessionRunning = false;
    isBreakRunning = false;
    //this.audio.currentTime = 0;
    //this.audio.load();

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
        <audio id="beep" preload="auto"></audio>
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
            <a href="#" id="start_stop" class="btn" onClick={this.controlTimer}>
              {this.state.startStopLabel}
            </a>
            <a href="#" id="reset" class="btn" onClick={this.reset}>
              Reset
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


