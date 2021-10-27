import React from 'react'
import DayPicker from 'react-day-picker'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { IoIosCalendar } from 'react-icons/io'
import { getField } from './util'
import range from 'lodash/range'

const _listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const reduceDate = {
    init: {
        isDatePicker: {},
    },
    actions: {
        pickDate: (state, { id, index, day }) => {
            const _f = getField(state, id, index)

            //console.log(day.getDay())
            _f.value = day
            _f.isDatePicker = false
        },
        selectDate: (state, { option, item, id, index, tp, v }) => {
            //console.log(id, item, field, tp, v)
            const _f = getField(state, id, index)
            //const value = _f.value || new Date()
            const value = _f.value ? (typeof _f.value.getYear == 'function' ? _f.value : new Date(_f.value)) : new Date();
            let d = value.getDate(),
                m = value.getMonth(),
                y = value.getYear() + 1900

            if (tp == 'Day')
                d = v

            else if (tp == 'Month')
                m = _listMonth.indexOf(v)

            else
                y = v

            _f.value = new Date(y, m, d)
            if (option)
                state.fields[option].value = item
        },
        toggleDate: (state, { index, id }) => {
            const _f = getField(state, id, index)

            _f.isDatePicker = !_f.isDatePicker

            //state.isDatePicker[k] =
            //state.isDatePicker[k] ? !state.isDatePicker[k] : true
        },
        resetDate: (state, {id, index}) => {
            const _f = getField(state, id, index)
            _f.value = ''
        }
    }
}

const popover = ({ call, id, index, value }) => {
    return (
        <Popover>
            <Popover.Content>
                <DayPicker initialMonth={value}
                    onDayClick={day => call('pickDate', { id, index, day })} />
            </Popover.Content>
        </Popover>
    )
}

const Select = ({ tp, value, list, call, id, option, item, index }) =>
    <select className='form-control' id={id + tp}
        value={value}
        onChange={e => call('selectDate',
            { option, item, id, index, tp, v: e.target.value })} >
        {list.map((t, i) => <option key={id + i + t}>{t}</option>)}
    </select>

const styleResetButton = {
    margin: '2px 5px 0 5px',
    cursor: 'default'
}

export const utInputDate = _this => ({ option, item, id, index, yearStart = 20 }) => {
    const { props, getField } = _this
    const { _, call } = props

    const _field = getField(id)
    const listMonth = [..._listMonth]

    //console.log(typeof (index))
    //const value = _field.value || new Date()

    const value = _field.value ? (typeof _field.value.getYear == 'function' ? _field.value : new Date(_field.value)) : new Date();
    
    const y = value.getYear() + 1900,
        m = value.getMonth(),
        d = value.getDate()

    // Display date
    const dd = _field.value ? [y, listMonth[m] , d] : ['', '', '']


    const listDay = range(1, new Date(y, m + 1, 0).getDate() + 1),
        listYear = range(y - yearStart, y + 10)

    // Add null items
    if(!_field.value) {
        listDay.unshift('')
        listMonth.unshift('')
        listYear.unshift('')
    }
    
    const _props = { call, id, index, item, option }

    return (
        <span className='day-picker'>
            <Select {...{ tp: 'Day', list: listDay, value: dd[2], ..._props }} />
            <Select {...{ tp: 'Month', list: listMonth, value: dd[1], ..._props }} />
            <Select {...{ tp: 'Year', list: listYear, value: dd[0], ..._props }} />
            <div onClick={() => call('resetDate', {id, index})} style={styleResetButton}>X</div>
            <OverlayTrigger trigger="click"
                show={_field.isDatePicker || false}
                placement="right" overlay={popover({ call, id, index, value })}>
                <span>
                    <IoIosCalendar size={25} onClick={() => call('toggleDate', { index, id })} />
                </span>
            </OverlayTrigger>
        </span>
    )
}