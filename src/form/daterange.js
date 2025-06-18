import React, {useEffect, useState} from 'react'
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

export const SingleDate = ({ _elem_id, _f, _isRead, value, onChange, onClear }) => {

    const dateFormat = _f?.format ?? 'dd/MM/yyyy';
    // const [inputValue, setInputValue] = useState('');    // initialise local text once
    const [inputValue, setInputValue] = useState(() =>
        value && isValid(value) ? formatdate2(value, dateFormat) : ''
    );

    /* ------------------------------------------------------------------ *
    * ❷ Keep the local text in sync with the parent `value` *after* render
    *    (never from inside the render function itself).
    * ------------------------------------------------------------------ */
    useEffect(() => {
        if (!value) {
        setInputValue('');        // cleared
        } else if (isValid(value)) {
        setInputValue(formatdate2(value, dateFormat));
        }
    }, [value, dateFormat]);

    /* ---------------- raw typing in the input ---------------- */
    const handleRawChange = (e) => {
        const newVal = e?.target?.value;
        if (typeof newVal !== 'string') {
            return;
        }       
        
        const cursor = e.target.selectionStart;

        // Stop once the user typed a 5-digit year
        const yrMatch = newVal.match(/(\d{4,})$/);
        if (yrMatch && Number(yrMatch[1]) > 9999) return;

        setInputValue(newVal);
        // keep caret position
        requestAnimationFrame(() =>
        e.target.setSelectionRange(cursor, cursor)
        );
    };

    /* ---------------- click / select / “X” from the calendar ------------ */
    const handleDateChange = (date, ev) => {
        /* *** ❸ React-datepicker passes `null` when “X” is clicked *** */
        if (!date) {
        setInputValue('');
        onChange({ target: { value: null } });
        onClear?.(ev);            // tell the parent the clear button was hit
        return;
        }

        // normal pick
        if (date instanceof Date && isValid(date) && date.getFullYear() <= 9999) {
        setInputValue(formatdate2(date, dateFormat));
        onChange({ target: { value: date } });
        }
    };

   /* ---------------- leave-field validation ---------------- */
    const handleBlur = () => {
        if (!inputValue) {
        onChange({ target: { value: null } });
        return;
        }
        const parsed = parse(inputValue, dateFormat, new Date());
        if (!isValid(parsed) || parsed.getFullYear() > 9999) {
        const today = new Date();
        setInputValue(formatdate2(today, dateFormat));
        onChange({ target: { value: today } });
        } else {
        setInputValue(formatdate2(parsed, dateFormat));
        onChange({ target: { value: parsed } });
        }
    };   


    // inputValue === '' && value && setInputValue((0, formatdate2)(value, dateFormat));   
    
    return <SingleDatePicker
        id={_elem_id}
        value={inputValue}
        selected={
            isValid(parse(inputValue, dateFormat, new Date())) 
                ? parse(inputValue, dateFormat, new Date()) 
                : null
        }
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

