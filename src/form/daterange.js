import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Button from 'react-bootstrap/Button'
import { GoCalendar } from 'react-icons/go'
import { DateRangePicker, Calendar, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment'
import SingleDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { range } from 'lodash'
import { parse, isValid, format as formatdate2} from 'date-fns';

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

const yy = (new Date()).getFullYear()
const years = range(  /*yy - 40*/1900, yy + 5, 1)
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const custom_header = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => {

    var y2 = date.getFullYear() + 5
    var y1 = years[years.length - 1]

    if(y2 > y1)
        for(var y = y1 + 1; y < y2; y++)
            years.push(y)

    return <div
        style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
        }}
    >
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
        </button>
        <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
        >
            {years.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>

        <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
            }
        >
            {months.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>

        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
        </button>
    </div>
}

export const SingleDate = ({ _elem_id, _f, _isRead, value, onChange }) => {
    // if (value == '' || value == null) value = new Date()

    const dateFormat = _f?.format ?? 'dd/MM/yyyy';
    const [inputValue, setInputValue] = useState('');

        // Handle raw input changes (user typing)
    const handleRawChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        const cursorPosition = e.target.selectionStart;

        // Parse the input to check for year > 9999
        if(newValue){
        const parsedDate = parse(newValue, dateFormat, new Date());
        if (isValid(parsedDate) && parsedDate.getFullYear() > 9999) {
            // Prevent further input if year > 9999
            e.preventDefault();
            return;
        }
        
        // Update inputValue to reflect exactly what was typed
        setInputValue(newValue);
        e.target.setSelectionRange(cursorPosition, cursorPosition);
        }
    };

    // Handle date selection from the calendar
    const handleDateChange = (date) => {
        if (date instanceof Date && isValid(date) && date.getFullYear() <= 9999) {
        setInputValue(formatdate2(date, dateFormat));
        onChange({ target: { value: date } });
        } else {
        setInputValue('');
        onChange({ target: { value: null } });
        }
    };

    const handleBlur = (e) => {
        const parsed = parse(inputValue, dateFormat, new Date());
        if(e.target.value === '') {
            setInputValue('');
            onChange({target: {value: null}});
        } else if (!isValid(parsed) || parsed.getFullYear() > 9999) {
        const today = new Date();
        setInputValue(formatdate2(today, dateFormat));
        onChange({ target: { value: today } });
        }else {
            setInputValue((0, formatdate2)(parsed, dateFormat));
            onChange({target: {value: parsed}});
        }
    };
    

    return <SingleDatePicker
        id={_elem_id}
        value={inputValue}
        selected={isValid(parse(inputValue, dateFormat, new Date())) ? parse(inputValue, dateFormat, new Date()) : null}
        className='form-control'
        renderCustomHeader={custom_header}
        onChange={handleDateChange}
        onChangeRaw = {(e) => {
            e.preventDefault(); // Prevent react-datepicker's default parsing
            handleRawChange(e); // Use our custom handler
        }}
        onBlur={handleBlur}
        disabled={_isRead}
        dateFormat={dateFormat}
        holidays={_f.holidays ?? hk}
        todayButton="Today"
        isClearable= {!_isRead}
    />
}

