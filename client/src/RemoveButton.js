import React, { Component } from 'react';
import $ from 'jquery';
import configs from './config/config';
import removeButton from './remove.png';

class RemoveButton extends Component {

	constructor(props) {
		super(props);
		this.removeLink = this.removeLink.bind(this);
	}

	removeLink() {
		$.ajax({
			url: `/delete/${this.props.linkId}`,
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
					src={removeButton}
				/>
			</div>
		);
	}

}

export default RemoveButton;