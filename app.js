// Pomodoro Clock
// Lee Gainer
// March 2019

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionCount: 0,
      breakCount: 0
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

  minusCount(x) {
    console.log(x)
    if (x === "session") {
      let y = this.sessionCount;
      console.log("here:" + y);
      if(y - 1 >= 0) {
        y -= 1;
      }
      console.log("session: " + y);
      this.setState({
        sessionCount: y
      });
    } else {
      let y = breakCount - 1;
      console.log("break: " + y);
      this.setState({
        breakCount: y
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
              onClick={() => this.minusCount("session")}
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
              onClick={() => this.minusCount("break")}
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
