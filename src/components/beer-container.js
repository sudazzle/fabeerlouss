import React, { Component } from 'react'
import { apiBasUurl } from 'config'
import style from '../style/beerContainer.scss'
import Beer from './beer'
class BeerContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {beers: []}
	}

	componentDidMount() {
		this.fetchData()
	}

	componentWillReceiveProps() {
		this.fetchData()
	}

	fetchData() {
		let queryString = this.props.generateQueryString(this.props.query)
		if(queryString) {
			fetch(`${apiBasUurl}/beers/?${queryString}`)
				.then(response => response.json())
				.then(json => {
					if(json.data.data) {
						this.setState({beers: json.data.data})
					} else {
						this.setState({beers:[]})
					}
				})
		}
	}

	render() {
		return (
			<div className={style.beerContainerWrapper}>
				<div className={style.beerContainer}>
					{
						this.state.beers.map(({name, labels={icon:'', 'medium':'http://icons.iconarchive.com/icons/flat-icons.com/flat/512/Beer-icon.png', large:''}} = beer, idx) => {
							let {icon, medium, large} = labels
							return <Beer 
										name={name} 
										key={idx}
										icon={icon}
										medium={medium}
										large={large}
										 />
						})
					}
				</div>
			</div>
		)
	}
}

export default BeerContainer