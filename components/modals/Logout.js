
import React, { Component } from 'react';

export default class logout extends Component {
	render() {
		console.log("ASDASDSDAD")
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-md-offset-4 text-center">
						<div className="avatar" style={{border:'none'}}>
		          <img className="img-circle" src={'/dist/images/5.png'} alt="" />
		        </div>
		        <a href="javascript:;"><h2 className="text-uppercase">Rocket Racoon</h2></a>
		        <p>info@microsoft.com</p>
	        </div>
				</div>
			</div>
		);
	}
}
