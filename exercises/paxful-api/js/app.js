import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class App extends Component {

    socket = new WebSocket('ws://' + window.document.location.host.replace(/:.*/, '') + ':8888');

    constructor() {
        super();
        this.state = {
            isWSReady: false,
            isPooling: false
        };
        this.onClick = this.onClick.bind(this);
        this.onWindowMessage = this.onWindowMessage.bind(this);
        this.socket.onmessage = App.onWSmessage.bind(this);
    }

    componentDidMount() {
        this.socket.onopen = () => this.setState({isWSReady: true});
        window.addEventListener("message", this.onWindowMessage);
    }

    onClick() {
        if (!this.state.isPooling) {
            this.socket.send(JSON.stringify({command: "start-price-modifications"}));
        } else {
            this.socket.send(JSON.stringify({command: "stop-price-modifications"}));
        }
        this.setState({isPooling: !this.state.isPooling})
    }

    static onWSmessage(event) {
        const data = JSON.parse(event.data);
        if (data.direction === 'dispatcher' && this.state.isPooling) {
            window.postMessage(data, "*");
        }
    }

    onWindowMessage(event) {
        console.log("client, got message", event);
        if (event.data.direction === 'server') {
            this.socket.send(event.data.value);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TextField hintText="AD Hash" ref={(el) => this.input = el} defaultValue={'AgqeBpZnnmX'}/>
                    <RaisedButton ref={(el) => this.button = el} disabled={!this.state.isWSReady}
                                  label={!this.state.isPooling ? "Start Price Modifications" : "Stop Price Modifications"}
                                  onClick={this.onClick}/>
                </div>
            </MuiThemeProvider>);
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);