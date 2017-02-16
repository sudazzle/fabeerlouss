import React, { Component } from 'react'
import style from '../style/app.scss'
import logo from '../img/fabeerlous.png'

class Header extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={style.header}>
				<img className={style.logo} src={logo}  alt="fabeerlous logo"/>
				<span onClick={this.props.showFilterView} className={style.showFilter}>Show Filters</span>
			</div>
		)
	}
}

export default Header