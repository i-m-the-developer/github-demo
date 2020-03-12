import React, { Component } from "react";
import { Container, ListGroup, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getJobs, deleteJob,updateJob,getUSStates } from "../actions/jobActions";
import PropTypes from "prop-types";

class JobList extends Component {
  static propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getJobs();
    this.props.getUSStates();
  }
  onDelete = id => {
    this.props.deleteJob(id);
  };
  onUpdate = job => {
    const { user } = this.props.auth;
    console.log("user auth object in JobList", user);
    job.username = user.email;
    this.props.updateJob(job);
  };
  render() {
    const { jobs } = this.props.job; //coming from itemReducers
    console.log(`jobs in JobList.component render >>>>`, jobs);
    return (
      <Container>
        <ListGroup>

          <Table striped>
            <thead>
              <tr>
                <th>User</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Description</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => {
                return (
                  <tr key={job._id}>
                     <td>{job.username}</td>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.description}</td>
                    <td>{job.job_type}</td>
                    <td>
                      {this.props.isAuthenticated ? 
                      (
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDelete.bind(this, job._id)}
                        >
                          &times;
                        </Button>
                      ) : ("")
                      
                      }
                      {this.props.isAuthenticated ? 
                      (
                        <Button
                          className="edit-btn"
                          color="link"
                          size="sm"
                          onClick={this.onUpdate.bind(this, job)}
                        >
                          Edit
                        </Button>
                      ) : ("")
                      
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  job: state.job, //key is item here becuase this is what we called in our root reducers > index.js file inside reducers folder
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getJobs, deleteJob,updateJob,getUSStates })(JobList);
