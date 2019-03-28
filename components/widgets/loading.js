import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
	state ={isShown:false}

	componentWillReceiveProps(nextProps) {
		console.log('toshowProps', nextProps)
		this.setState({isShown:nextProps.showLoader})
	}
	render () {
		console.log('toshow', this.state.isShown)
		const {isShown} = this.state
		return (
			<div
				className="justify-content-center align-items-center"
				style={{display:isShown?'flex':'none', marginLeft:'-15px', zIndex:'99999', position:'fixed', width:'100%', height:'100%', background:'rgba(217, 217, 217, 0.45)'}}>
				<ReactLoading type={'bars'} color={'#71c8e6'} height={'30px'} width={'10%'} />
			</div>
		)

	}
}


export default Loading;