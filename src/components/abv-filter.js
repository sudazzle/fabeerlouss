import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InputRange from 'react-input-range'
import style from '../style/slider.scss'

class AbvFilter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			range: {
				min: 0,
				max: 0
			}
		}

		this.handleChange = this.handleChange.bind(this)
	}

	componentWillReceiveProps(nextProp) {
		this.setState({
			range: nextProp.selectedValue
		})
	}

	splitAbv(value) {
		value = value.split(',')
		
		return {
			min: value[0],
			max: value[1]
		}
	}

	handleChange(range) {
		let {min, max} = range
		this.setState({range})
	}

	triggerFilter(range) {
		this.props.filterByAbv(range)
	}

	render() {
		let { range } = this.state,
			{	
				disabledInputRange,
				activeTrack,
				inputRange,
				labelContainer,
				maxLabel,
				minLabel,
				slider,
				sliderContainer,
				track,
				valueLabel,
				abvRangeSelectorWrapper,
			} = style,

			sliderClasses = {
				disabledInputRange,
				activeTrack,
				inputRange,
				labelContainer,
				maxLabel,
				minLabel,
				slider,
				sliderContainer,
				track,
				valueLabel
			}
		return (
			<div className={abvRangeSelectorWrapper}>
				<InputRange
					step={1}
					minValue={0}
					maxValue={100}
					formatLabel={(value) => `${value}%`}
					value={range}
					classNames={sliderClasses}
					onChange={this.handleChange}
					onChangeComplete={this.triggerFilter.bind(this)}/>
			</div>
		)
	}
}

export default AbvFilter