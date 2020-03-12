import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {register} from '../../actions/authActions';
import{clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error){
      //Check for register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({msg:error.msg.msg});
      }else {
        this.setState({msg:null});
      }
    }
    if(this.state.modal){
      if(isAuthenticated){
        this.toggle();
      }
    }
  }

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const {name, email, password} = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    };

    //Attempt to register user
    this.props.register(newUser);

    //Close the modal
    //this.toggle();
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>:null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="item">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="item">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Register
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated, //key is item here becuase this is what we called in our root reducers > index.js file inside reducers folder
  error: state.error
});
export default connect(mapStateToProps, {register,clearErrors})(RegisterModal);
