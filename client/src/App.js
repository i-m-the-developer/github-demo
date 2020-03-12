import React, {Component} from "react";
import AppNavBar from "./components/AppNavbar.component";
import JobList from "./components/Joblist.component";
import JobModal from "./components/JobModal";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/authActions';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
      return (
        <Provider store={store}>
          <div className="App">
            <AppNavBar></AppNavBar>
            <Container>
             <JobModal></JobModal>
              <JobList></JobList>
            </Container>
          </div>
        </Provider>
      );
  }
 
}

export default App;
