import React from 'react'
import clsx  from 'clsx'
import PropTypes from 'prop-types'

import './details.scss'
import { Title } from '../../components/title'

export const Details = ({ className}) => {
	const classes = clsx('about', className)
	return <div className={classes}>
		<Title>
			Информация о мероприятии
		</Title>

<div className='about-header'>
	Здесь будут основные данные
</div>
		<div className='about-table'>
Здесь будет таблица
		</div>
	</div>
}