import React, { Component } from 'react'
import { apiBasUurl } from 'config'
import _ from 'lodash'
import style from '../style/filter.scss'

class StyleFilter extends Component {
	constructor(props) {
		super(props)

		this.state = {
			checkboxes: [
				{
					id: 123456,
					name: 'something'
				}
			],
			selectedOption: 0
		}
	}

	componentDidMount() {
		this.fetchData()
	}

	componentWillReceiveProps(nextProp) {
		this.setState({
			checkboxes: this.state.checkboxes,
			selectedOption: nextProp.selectedOption
		})
	}

	fetchData() {
		fetch(`${apiBasUurl}/${this.props.dataSource}`)
			.then(response => response.json())
			.then(json => {
				if(json.data.data) {
					this.setState({
						checkboxes: json.data.data,
						selectedOption: 0
					})
				}
			})
	}

	toggleCheckbox(index) {
		const checkboxes = this.state.checkboxes
		if(index == this.state.selectedOption) {
			this.props.filterByStyle('')
			index = 0
		} else {
			this.props.filterByStyle(index)
		}

		this.setState({
			checkboxes: checkboxes, selectedOption: index
		})

		this.props.show()
	}

	renderCheckboxes() {
		return _.sortBy(this.state.checkboxes, (item) => {
			return item.name
		}).map((checkbox, idx) => {
			return(
				<label key={idx}>
					<input
						type="checkbox"
						checked={checkbox.id == this.state.selectedOption}
						onChange={this.toggleCheckbox.bind(this, checkbox.id)} />
						{checkbox.name}
				</label>
			)
		})
	}

	render() {
		return(
			<div id={this.props.id}>
				<div className={style.filterHeader}>{this.props.name}</div>
				<div className={style.filterOptions}>
					{this.renderCheckboxes.call(this)}
				</div>
			</div>
		)
	}
}
export default StyleFilter