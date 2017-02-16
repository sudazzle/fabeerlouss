import React, { Component } from 'react'
import StyleFilter from './style-filter'
import TimeFilter from './time-filter'
import AbvFilter from './abv-filter'
import style from '../style/filter.scss'

class FiltersView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false
		}
	}

	show() {
		console.log('got hrere')
		this.setState({
			visible: true
		})

		document.addEventListener('click', this.hide.bind(this), true, false)
	}

	hide(e) {
		this.setState({
			visible: false
		})
	}

	render() {

		return(
			<div id="filtersContainer" className={this.state.visible ? style.visible : style.filtersWrapper}>
				<div 
					className={style.hideFilterHidden}
					onClick={this.hide.bind(this)}>Hide Filters &#187;</div>
				<div className={style.abvFilterHeader}>Alcohol Volume</div>
				<AbvFilter
					show={this.show.bind(this)} 
					selectedValue={this.props.query.abv} 
					filterByAbv={this.props.filterByAbv} />
				<StyleFilter
					name="Style Filter"
					id="styleFilter"
					show={this.show.bind(this)}
					selectedOption={this.props.query.styleId} 
					dataSource="styles" 
					filterByStyle={this.props.filterByStyle} />
				<div className={style.filterHeader}>Vintage Year</div>
				<TimeFilter 
					show={this.show.bind(this)} 
					filterByDate={this.props.filterByDate}/>
			</div>
		)
	}
}

export default FiltersView