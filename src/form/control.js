import React, { createElement } from 'react'
import { Form } from 'react-bootstrap'
import { capitalize } from '..'
import { getField } from './util'
import Toggle from 'react-toggle'
import { AiOutlineHourglass } from 'react-icons/ai'
import { isUndefined, isEmpty, isObject, isArray, isString } from 'lodash'
import 'react-toggle/style.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import { DateRange, DatePicker, SingleDate } from './daterange'
import 'react-bootstrap-typeahead/css/Typeahead.css'


const loop = (parent, child, cb) => child ?
    Object.entries(child).reduce((r, [key, link]) =>
        Object.assign(r, link.type && link.type.match(/group/i) ?
            loop(link, link.child, cb) : cb(parent, key, link)
        )
        , {})
    : null

export const utControlActions = {
    change: (state, { id, val, index, type, _id }) => {
        const _f = getField(state, id, index)
        let isSingle = true

        if (_f.type === 'select' && _f.format) {

            const m = _f.format.match(/^\d*?,(\d*?),(.*)$/) // eg 25,5,False

            if (m && parseInt(m[1]) > 1 && m[2] === 'True') { // Multiple select
                if (!isArray(_f.value))
                    _f.value = [_f.value]

                if (_f.value.length > 0 && typeof _f.value[0] === 'number')
                    val = parseInt(val)

                let i = _f.value.indexOf(val)

                if (i < 0)
                    _f.value.push(val)
                else
                    _f.value.splice(i, 1)

                isSingle = false
            }
        }

        if (isSingle)
            _f.value = type === 'daterange' ? {
                startDate: val.selection.startDate,
                endDate: val.selection.endDate,
                key: 'selection'
            } : val

        _f.error = null
        state.focusid = _id
        state.isChanged = true
    },

    daterange: (state, { id, val, index }) => {
        const _f = getField(state, id, index)

        _f.value = {
            startDate: val.selection.startDate,
            endDate: val.selection.endDate,
            key: 'selection'
        }

        _f.error = null
        state.isChanged = true
    },

    checkbox: (state, { id, index, key }) => {
        const _f = getField(state, id, index)

        state.isChanged = true
        if (_f.value && _f.value.length > 0 && _f.value.charAt(0) !== '|')
            _f.value = '|' + _f.value

        key = '|' + key

        if (_f.value.indexOf(key) >= 0)
            _f.value = _f.value.replace(key, '')
        else
            _f.value += key
    },

    initFields: (state) => {
        state.fieldList = loop(null, state.fields,
            (parent, key, link) => {
                link.label = link.label || capitalize(key)
                link.type = link.type || 'text'
                link.value = link.value === undefined ?
                    (link.type === 'daterange' ? {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection'
                    } : '') : link.value
                return {
                    [key]: { link, parent }
                }
            })
        //console.log(state.fieldList)
    }
}

export const utControl = _this => props => {
    const { InputDate } = _this
    //**
    const _ = _this.props._ || _this.props.init._

    const { name, call } = _this.props
    let { st = 'value', id, index, children, elem, isRead,
        onChange, onKeyDown, onKeyPress, append } = props
    const _p = _this.getField(id, 'parent')
    const _f = _this.getField(id)

    let value = id ? _f[st] : null
    let _list
    const isIndex = !isUndefined(index)

    isRead = isRead || _f.isRead

    if (isIndex) {
        if (_p.type === 'multi-group') {
            value = _p.rows[index][id] ?
                _p.rows[index][id].value : ''
            _list = _p.rows[index][id].list
        }
    }

    const { type, list, valid, hint } = id ? _f : {}
    const _Change = onChange || _this.onChange
    const _KeyDown = onKeyDown || _this.onKeyDown
    const _KeyPress = onKeyPress || _this.onKeyPress
    const _isRead = isUndefined(isRead) ? !(isEmpty(_p) ? _.isEdit : _p.isEdit) : (isRead === 'true' || isRead)
    const _elem_id = name + '-' + id
    const _id = _elem_id + '-' + st

    //if(id== 'search') {
    //    console.log(_isRead)

    //}
    //if(id == 'billemail')
    //    console.log(_p)


    switch (type) {
        case 'toggle':
            //console.log(value)
            return <div >
                <Toggle aria-label={_f.label}
                    defaultChecked={value === true}
                    disabled={_isRead}
                    onChange={_Change({ id, index, type })} />
            </div>

        case 'radio':
            if (_isRead)
                return <div aria-label={_f.label}>{list[value]}</div>

        case 'checkbox':
            return <div aria-label={_f.label}>
                {list ? Object.entries(list).map(([key, choice], i) =>
                    <Form.Check inline disabled={_isRead}
                        checked={value && value.split('|').indexOf(key) >= 0}
                        style={{ padding: '8px 20px 0 0' }}
                        key={key + i}
                        id={_id + '-' + key}
                        type={type}
                        label={isObject(choice) && choice.child ? createElement(choice.child) : choice}
                        onChange={_Change({ id, key, index, type })} >
                    </Form.Check>
                ) : null}
            </div>

        case 'label':
            return <div aria-label={_f.label}>{value}</div>

        case 'typeahead':
            return value ?
                <Typeahead
                    id={_id + '-typeahead'}
                    labelKey={_f.key || 'text'}
                    multiple={!_f.single}
                    disabled={_isRead}
                    defaultSelected={value}
                    allowNew={_f.allowNew || false}
                    clearButton={_f.clearButton || false}
                    placeholder={_f.placeholder}
                    onChange={_Change({ id, index, type })}
                    options={_f.options}
                />
                : null

        case 'select':

            let style = {}
            let lst = list || _list

            const optionList = () => isArray(lst) ?
                lst.map(([key, choice], i) =>
                    <option key={key + '-' + i} value={key}>{choice}</option>
                )
                :
                lst ? Object.entries(lst).map(([key, choice], i) =>
                    <option key={key + '-' + i} value={key}>{choice}</option>
                ) : null

            if (_f.format) {
                const _n = _f.format.split(',')
                const _l = _n.length

                if (_l > 0)
                    style.width = (parseInt(_n[0]) * 10 + 20) + 'px'

                const _i = parseInt(_n[1])

                if (_i > 1) {
                    const _val = isArray(value) ? value : [value]

                    style.height = _i * 20 + 6 + 'px'

                    return <select
                        id={_elem_id}
                        multiple="multiple"
                        className='form-control'
                        row={_n[1]}
                        value={_val || []}
                        disabled={_isRead}
                        aria-label={_f.label}
                        style={style}
                        onChange={_Change({ id, index, type })}>
                        {optionList()}
                    </select>
                }
            }

            return (
                <Form.Control
                    id={_elem_id}
                    as={type} value={value || ''}
                    disabled={_isRead}
                    aria-label={_f.label}
                    style={style}
                    onChange={_Change({ id, index, type })}>
                    {optionList()}
                </Form.Control>
            )


        case 'singledatepicker':

            return <SingleDate {...{
                _elem_id,
                _f, _isRead, value,
                onChange: _Change({ id, index, type })
            }} />

        case 'datepicker':
            return _isRead ? <div>{value}</div> : <InputDate id={id} index={index} />

        case 'daterange':
            return <DateRange {...{
                _f, _isRead, value,
                onChange: _Change({ id, index, type })
            }} />

        case 'date':
            return _isRead ? <div aria-label={_f.label}>{value}</div> : <DatePicker {...{
                _f, _isRead, value,
                onChange: _Change({ id, index, type })
            }} />

        case 'password':
            if (_isRead)
                return value ? value.replace(/[^*]/gm, '•') : ''

        case 'number':
        case 'text':
        case 'textarea':
            //return <Form.Control id='xxx' type='text' value={_.fields.name.value} onChange={e =>   
            //    call('change', {id, val:e.target.value})} />

            if (_isRead)
                return <div aria-label={_f.label}>{value}</div>

            delete props.isRead

            const _props = {
                ...props,
                type, id: _id,
                value: value || '',
                onChange: _Change({ id, valid, index, type }),
                onKeyDown: _KeyDown,
                onKeyPress: e => _KeyPress({ char: e.key, value: e.target.value, id, type, e })
            }

            if (isIndex) _props.id += '-' + index

            if (type === 'textarea') {
                _props.as = type
                _props.rows = props.rows || 3
            }

            if (_f.format) {
                const _n = _f.format.split(',')
                const _l = _n.length

                if (_l >= 2) {
                    if (_n[0] === 'Text')
                        _props.maxLength = _n[2]

                    if (_l >= 3)
                        _props.style = { width: (parseInt(_n[1]) * 8 + 20) + 'px' }
                }
            }

            if (hint) _props.placeholder = hint

            return <Form.Control {...{
                ..._props,
                key: 'f=' + id,
                'aria-label': _f.label
            }} />

        default:
            if (_this.customfield[type]) {
                //console.log(props)
                return _this.customfield[type]({
                    props,
                    id, type, index, value, valid, isRead,
                    onChange: _Change({ id, valid, index, type })
                })
            }

            else
                return null
        //if (elem)
        //    return elem({ id, value })

        //return children
    }
}

const Pending = ({ id, children }) =>
    id && id.isPending ?
        <div className='field-pending'>
            <AiOutlineHourglass />{children}
        </div> : null