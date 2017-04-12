import React, { Component } from 'react';
import logo from './logo.png';
import $ from 'jquery';
import './App.css';
import ExportButton from './ExportButton';
import RemoveButton from './RemoveButton';
import configs from './config/config';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          links: [],
          contentLoaded: false
      };

      this.loadContent = this.loadContent.bind(this);
      this.renderLinksContent = this.renderLinksContent.bind(this);
  }

  loadContent() {
      let API_URL = configs.API_URL;
      $.ajax({
          url: `${API_URL}/all`,
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

  componentWillMount() {
      this.loadContent();
  }

  renderLinksContent(links) {
      const tableHeader = (
          <thead>
              <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Title</th>
                  <th>Link</th>
                  <th>Date</th>
                  <th>Export</th>
              </tr>
          </thead>
      );

      const lines = links.map(link => {
          return (
              <tr key={link.date}>
                  <th><RemoveButton linkId={link._id} callback={this.loadContent()} /></th>
                  <th>{link.username}</th>
                  <th>{link.title}</th>
                  <th><a href={link.url} target="_blank">link</a></th>
                  <th>{link.date}</th>
                  <th><ExportButton url={link.url} /></th>
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
