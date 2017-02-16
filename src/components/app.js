import React, { Component } from 'react'
import Header from './header'
import FiltersView from './filters-view'
import BeerContainer from './beer-container'
import style from '../style/app.scss'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			query: {
				styleId: '',
				year: '',
				abv: {
					min: 0,
					max: 0
				}
			},
			isFilterVisible: false
		}
	}

	showFilterView() {
		this.refs.filterView.show()
	}

	generateQueryString(queryObj) {
		let queryString = []
		for(let key in queryObj) {
			if(queryObj.hasOwnProperty(key)) {
				let value = queryObj[key]
				if (value !== '' &&  (key === 'styleId' || key === 'year'))
					queryString.push(`${key}=${value}`)

				if(key === 'abv' && value['max'] !== 0)
					queryString.push(`${key}=${value['min']},${value['max']}`) 
			}
		}

		return (queryString.length !== 0) ? queryString.join('&') : false
	}

	toggleFilter() {
		let latestState = this.this.state
		latestState.isFilterVisible = latestState.isFilterVisible ? false : true
		this.setState({
			isFilterVisible: latestState.isFilterVisible
		})
	}

	filterByStyle(styleId) {
		let latestState = this.state
		latestState.query.styleId = styleId
		this.setState({
			query: latestState.query
		})	
	}

	filterByDate(year = new Date().getFullYear()) {
		let latestState = this.state
		latestState.query.year = year
		this.setState({
			query: latestState.query
		})
	}

	filterByAbv(range = {min: 0, max: 0}) {
		let latestState = this.state
		latestState.query.abv = range
		this.setState({
			query: latestState.query
		})
	}

	render() {
		return(
			<div className={style.contentWrapper}>
				<Header showFilterView={this.showFilterView.bind(this)}/>
				<h1 className={style.beerContainerHeader}>Beer Container</h1>
				<BeerContainer 
					generateQueryString={this.generateQueryString.bind(this)}
					query={this.state.query}/>
				<FiltersView
					ref="filterView" 
					filterByAbv={this.filterByAbv.bind(this)}
					filterByStyle={this.filterByStyle.bind(this)}
					filterByDate={this.filterByDate.bind(this)}
					query={this.state.query}/>
			</div>
		)
	}
}
				// <Container />

export default App