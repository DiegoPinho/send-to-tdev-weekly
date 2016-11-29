import React, { Component } from 'react';
import logo from './logo.png';
import $ from 'jquery';
import './App.css';

const API_URL = 'https://tdevweekly-api.herokuapp.com/';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          links: [],
          contentLoaded: false
      };
  }

  componentWillMount() {
      $.ajax({
          url: `${API_URL}/url`,
          method: 'GET',
          dataType: 'json',
          success: (data) => {
              this.setState({
                  links: data,
                  contentLoaded: true
              });
          }
      });
  }

  renderLinksContent(links) {
      const tableHeader = (
          <thead>
              <tr>
                  <th>Username</th>
                  <th>Title</th>
                  <th>Url</th>
                  <th>Date</th>
              </tr>
          </thead>
      );

      const lines = links.map(function(link){
          return (
              <tr key={link.date}>
                  <th>{link.username}</th>
                  <th>{link.title}</th>
                  <th><a href={link.url} target="_blank">{link.url}</a></th>
                  <th>{link.date}</th>
              </tr>
          )
      });

      return (
          <table>
              {tableHeader}
              <tbody>
                  {lines}
              </tbody>
          </table>
      );
  }

  render() {
    let content;
    if(this.state.contentLoaded) {
        content = this.renderLinksContent(this.state.links);
    } else {
        content = <div>There're no links!</div>
    }

    return (
      <div className="App">
          <div className="App-header">
              <a href="http://confluence.touchtec.com.br/display/TOU/Touch+Dev+Weekly" target="_blank">
                  <img src={logo} className="App-logo" alt="logo" />
              </a>
          </div>
          <div className="App-intro">
              {content}
          </div>
      </div>
    );
  }
}

export default App;
