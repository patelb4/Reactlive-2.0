import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";
import LoginComponent from "./components/LoginComponent";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
  } from "react-router-dom";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            redirect: false,
        }
    }
    componentDidMount() {
        sessionStorage.getItem("userData");
    }

    componentWillMount() {
        sessionStorage.getItem("userData");
    }
    
    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        
        if (!sessionStorage.getItem("userData")) {
            return (
                <div>
                    <div className="calculator-body">
                        <h1 style={{textAlign: "center",marginTop: "80px"}}>Login Page</h1>
                        <LoginComponent/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="calculator-body">
                    <h1 style={{textAlign: "center",marginTop: "40px"}}>Calculator</h1>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
