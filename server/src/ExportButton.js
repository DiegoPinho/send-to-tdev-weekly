import React, { Component } from 'react';
import configs from './config/config';
import $ from 'jquery';

class ExportButton extends Component {

    constructor(props) {
        super(props);
        this.googlAPILink = 'https://www.googleapis.com/urlshortener/v1/url';
        this.shortURL = this.shortURL.bind(this);
    }

    shortURL() {
        const key = configs.GOOGL_API_KEY;
        $.ajax({
            url: `${this.googlAPILink}?key=${key}`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'longUrl': this.props.url}),
            success: (data) => {
                let shortURL = data.id;
                alert(shortURL);
            },
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.shortURL}>Export</button>
            </div>
        );
    }

}

export default ExportButton;
