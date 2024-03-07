import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Button from 'react-bootstrap/Button'
import { GoCalendar } from 'react-icons/go'
import { DateRangePicker, Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment'
import SingleDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const formatdate = datestring => moment(datestring).format('YYYY-MM-DD')


const _default = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}



export const DateRange = ({ _f, _isRead, value, onChange }) => {

    return <div className='date-range'>
        <span aria-label='Start Date'>{formatdate(value.startDate)}</span>
        <span> ~ </span>
        <span aria-label='End Date'>{formatdate(value.endDate)}</span>

        <Popup
            trigger={
                <Button
                    aria-label={_f.label}
                    variant='light'
                    disabled={_isRead}
                >
                    <GoCalendar />
                </Button>

            }
            modal>
            <DateRangePicker
                ranges={[value || _default]}
                onChange={onChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                direction="horizontal"
            />
        </Popup>
    </div>
}

export const DatePicker = ({ _f, _isRead, value, onChange }) => {

    if (value == '' || value == null) value = new Date()

    return <div className='date-range'>
        {formatdate(value)}

        <Popup
            trigger={
                <Button
                    aria-label={_f.label}
                    variant='light'
                    disabled={_isRead}>
                    <GoCalendar />
                </Button>
            }
            modal>
            <Calendar
                date={value}
                onChange={onChange}
            />
        </Popup>

    </div>
}

import { hk } from './holidays'

export const SingleDate = ({ _elem_id, _f, _isRead, value, onChange }) => {
    // if (value == '' || value == null) value = new Date()

    return <SingleDatePicker
        id={_elem_id}
        selected={value} 
        onChange={v =>
            onChange({ target: { value: v } })}
        disabled={_isRead}
        dateFormat={_f.format ?? 'dd/MM/yyyy'}
        holidays={_f.holidays ?? hk}
        showYearDropdown
        todayButton="Today"

    />
}

