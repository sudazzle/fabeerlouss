import React, { Component } from 'react'
import style from '../style/beer.scss'

class Beer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div key={this.props.idx} className={style.beerWrapper}>
				<img className={style.beerIcon} src={this.props.medium} alt={`${this.props.name} icon`}/>
				<div className={style.beerName}>{this.props.name}</div>
			</div>
		)
	}
}

export default Beer