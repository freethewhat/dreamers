import React, { Component } from 'react';
import '../App.css';
import LoginScreen from './LoginScreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
injectTapEventPlugin();
class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="Main">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}
export default Main;