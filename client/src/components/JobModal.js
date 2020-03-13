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
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addJob } from "../actions/jobActions";
import PropTypes from "prop-types";

class JobModal extends Component {
  state = {
    modal: false,
    dropdownOpen: false,
    username: "",
    title: "",
    company: "",
    location: "",
    description: "",
    job_type: ""
  };
  static propTyes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      const newJob = {
        username: user.email,
        title: this.state.title,
        company: this.state.company,
        location: this.state.location,
        description: this.state.description,
        job_type: this.state.job_type
      };
      console.log(`value in jobModal.js`, newJob);
      //Add item via additem action
      this.props.addJob(newJob);
      //Close the modal
      this.toggle();
    }
  };
  getAllStates=()=>{
    const {usStates} = this.props.job;
    //console.log(`US States in render in modal`,usStates);
    
    

    return <p></p>;
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    //console.log(`is user authenticated `, isAuthenticated);
  
    
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            onClick={this.toggle}
            style={{ marginBottom: "2rem" }}
          >
            Add Job
          </Button>
        ) : (
          ''
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Job</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="job title"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="name">Company</Label>
                <Input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="company"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="name">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="location"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="name">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Label for="name">Type</Label>
                
                <Input type="select" name="job_type" id="job_type" className="mb-3" onChange={this.onChange}>
                <option value="">Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </Input>
                
              </FormGroup>
              <div>{this.getAllStates()}</div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Add
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
  job: state.job, //key is job here becuase this is what we called in our root reducers > index.js file inside reducers folder
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth //key is auth here becuase this is what we called in our root reducers > index.js file inside reducers folder
});
export default connect(mapStateToProps, { addJob })(JobModal);
