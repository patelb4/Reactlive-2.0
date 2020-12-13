import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { PostData } from "./PostData";
import { Redirect } from "react-router-dom";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  login = async () => {
    if (this.state.username && this.state.password) {
      PostData("login", this.state).then(result => {
        let responseJson = result.Data;
        if (responseJson.user) {
          sessionStorage.setItem("userData", JSON.stringify(responseJson));
          this.setState({ redirect: true });
        } else {
          this.toggle();
        }
      });
    } else {
      this.toggle();
    }
  }

  render() {
    const { username, password } = this.state;
    const isEnabled = username.length > 0 && password.length > 0;

    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    if (sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }

    return (
           <div className="app flex-row align-items-center bg-white">
           <Container>
           <Row className="justify-content-center">
          <Col md="12" className="text-center">
           <CardGroup>
           <Card className="p-1">
           <CardBody>
           <p className="text-muted">Sign in to your account</p>               <InputGroup className="mb-3 mt-3">
             <Input
             type="text"
             name="username"
              id="username"
              placeholder="Username"
              value={username}
               onChange={e => {
               this.handleChange(e);
                        }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        value={password}
                        onChange={e => this.handleChange(e)}
                      />
                    </InputGroup>
                       <Row>
                      <Col xs="12">
                        <Button
                          style={{width: "90px", height: "50px"}}
                          type="submit"
                          disabled={!isEnabled}
                          onClick={this.login}
                        >
                          Login
                        </Button>
                        </Col>
                        </Row>
                        </CardBody>
                 <      /Card>
                       </CardGroup>
                       </Col>
                       </Row>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            className=" modal-dialog-centered"
          >
            <ModalHeader id="responsive-dialog-title">
              {"Invalid Credentials !"}
            </ModalHeader>
            <ModalBody>
              {" "}
              Uh oh! Your Username or Password is incorrect !
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleClose} color="info">
                Ok
        </Button>
        </ModalFooter>
        </Modal>
       </Container>
      </div>
    );
  }
}

export default LoginComponent;
