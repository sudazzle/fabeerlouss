import React, { Component } from 'react'
import style from '../style/filter.scss'

class TimeFilter extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			year: new Date().getFullYear()
		}
	}

	handleChange(e) {
		let year = e.target.value
		this.setState({year})
		this.props.filterByDate(year)
	}

	render() {
		let yearOptions = []
		// beer history dates back to our ancient but here we are talking about modern beers which dates back to 1900
		for(let i=1900; i<= new Date().getFullYear(); i++) {
			yearOptions.push(<option key={i} value={i}>{i}</option>)
		}
		return(
			<select 
				className={style.yearSelector} 
				onClick={this.props.show} 
				id={this.props.id} 
				defaultValue="" 
				onChange={this.handleChange.bind(this)}>
				{ yearOptions }
				<option value="">--Select--</option>
			</select>
		)
	}
}

export default TimeFilter
