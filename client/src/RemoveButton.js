import React, { Component } from 'react';
import $ from 'jquery';
import configs from './config/config';

class RemoveButton extends Component {

	constructor(props) {
		super(props);
		this.removeLink = this.removeLink.bind(this);
	}

	removeLink() {
		let API_URL = configs.API_URL;
		$.ajax({
			url: `${API_URL}/delete/${this.props.linkId}`,
			type: 'DELETE',
			success: result => {
				alert('Link removido com sucesso!');
				this.props.callback();
			}
		});
	}

	render() {
		return (
			<div>
				<img onClick={this.removeLink}
					alt="Remover" title="Remover"
					width="25" height="25" 
					style={{"cursor": "pointer"}} 
					src="http://www.clker.com/cliparts/L/b/2/s/h/1/remove-button-md.png" 
				/>
			</div>
		);
	}

}

export default RemoveButton;