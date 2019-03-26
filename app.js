// Pomodoro Clock
// Lee Gainer
// March 2019

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionCount: 25,
      breakCount: 5
    };
  }
  
  

  // logic
  /*
  function displayCountdown(amount) {
      if (amount < 600) {
        // if less than 10 minutes
        if (amount % 60 > 9) {
          // 10 seconds or more
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          // 9 seconds or less
          $("#time-left").html("0" + Math.floor(amount / 60) + ":" + "0" + amount % 60);
        }
      } else {
        // if more than 10 minutes
        if (amount % 60 > 9) {
          // 10 seconds or more
          $("#time-left").html(Math.floor(amount / 60) + ":" + amount % 60);
        } else {
          // 9 seconds or less
          $("#time-left").html(Math.floor(amount / 60) + ":" + "0" + amount % 60);
        }
      }
    }
  });
  */

  updateCount(x, y) {
    let z = 0;
    
    // update sessionCount
    if (x === "session") {
      z = this.sessionCount;  // TODO ISSUE not being assigned value
      console.log("z: " + z);
      
      if(y === "-"){
        // count must be 1 or more
        if(z - 1 >= 1) {
          z -= 1;
        } else {
          alert("Session Length must be greater than 0.");
        }
      } else {
        // count must be less than 61
        if(z + 1 <= 60) {
          z += 1;
        } else {
          alert("Session Length cannot exceed 60 minutes.")
        }
      }
      console.log("z: " + z);
      this.setState({
        sessionCount: z
      });
    // update breakCount
    } else {
      z = this.breakCount;
      if(y === "-") {
        
      } else {
        
      }
      this.setState({
        breakCount: z
      });
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
            >-</a>
            <p id="session-length">{this.state.sessionCount}</p>
            <a href="#" id="session-increment" class="btn">
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
            <p id="break-length">{this.state.breakCount}</p>
            <a href="#" id="break-increment" class="btn">
              +
            </a>
          </div>
          <div id="timerDiv" class="centerRow">
            <h2 id="timer-label">
              Session Time: <span id="time-left">00:00</span>
            </h2>
          </div>
          <div class="centerRow">
            <a id="start_stop" class="btn" href="#">
              Start
            </a>
            <a id="reset" class="btn" href="#">
              Reset
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
