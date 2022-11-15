import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { isEmpty } from 'lodash'

export const onChange = _this => ({ id, index, valid, type, key, _id }) => e => {

    const { call, api, _ } = _this.props
    const _f = _this.getField(id)
    let val = type === 'toggle' ? e.target.checked :
        type === 'checkbox' ? _f.value :
            type === 'typeahead' ? e :
                e.target.value

    //console.log(id, val)

    if (_this.fieldOnChange({ id, index, key, type, value: val, e, call, api })) {
        if (valid) {
            const msg = check({ val, o: valid })

            if (msg) {
                //console.log(msg)
                return call('errorMessage', { id, index, msg, val })
            }
        }

        if (type == 'checkbox')
            call('checkbox', { id, index, key })
        else {

            if (type == '_select') {
                const obj = _f.list
                val = Object.keys(obj).find(key => obj[key] === val)
            }

            call('change', { id, index, val: type === 'radio' ? key : val, _id })
        }
    }
}


export const getInitField = _this => (id, tp = 'link') => {

    //** const { fieldList } = _this.props._
    const _ = _this.props._ || _this.props.init._
    const { fieldList } = _

    return fieldList[id] ? fieldList[id][tp] || {} : {}
}

const EditField = ({ sm = 12, error, elem }) =>
    <Col sm={sm}>
        <div className='field-append'>
            {elem}
            {/*this.Control({ id, index, children, elem, st, append })*/}
        </div>
        <div className='invalid-feedback' style={{ display: 'block' }}>
            {error}
        </div>
    </Col>

const { Group, Label } = Form

export const utfield = _this => props => {
    const { children, id, index,
        labelWidth, no = 1,
        labelPosition,
        elem, append,
        hide,
        readOnly,
        onKeyPress,
        customlabel, st, drag } = props

    //** const { _ } = _this.props

    //console.log(_this)

    const _ = _this.props._ || _this.props.init._

    const _f = _this.getField(id)
    const _p = _this.getField(id, 'parent')

    if (isEmpty(_f)) {
        console.error(`Field id: ${id} not defined`)
        return `Field id: ${id} is not defined!`
    }

    //console.log(labelPosition)

    const _labelPosition = labelPosition ?
        (labelPosition === 'top' ? Col :
            labelPosition === 'none' ? 'none' : Row) :
        _.isRow === true ? Row : _.isRow === false ? Col : _.isRow

    const { label = customlabel, type, error } = id ? _f : {}
    let [w1, w2] = labelWidth || _.labelWidth[no - 1]

    //const param = { id, index, children, elem, st, append, isRead: readOnly, onKeyPress }

    const param = { ...props, isRead: readOnly }
    const className = (param.className || '') + ''

    delete param.className
    delete param.labelPosition
    delete param.labelWidth
    delete param.readOnly
    delete param.customlabel
    delete param.drag

    const _group = { ...drag, className }

    //console.log(_labelPosition)

    return (
        _labelPosition === 'none' ?
            //<Group {..._group}>
            //    {_this.Control(param)}
            //</Group> :
            _this.Control(param) :
            _labelPosition == Row ?
                <Group {...{ ..._group, as: Row }} >
                    <Label className={_f.mandate ? 'mandate' : ''} column sm={w1}>{label}</Label>
                    {_p.isPreview ?
                        preViewPending({ w2, _f, _this, param }) :
                        <EditField sm={w2} error={error} elem={_this.Control(param)} />
                    }
                </Group> :
                <Group {..._group}>
                    <Label className={_f.mandate ? 'mandate' : ''}>{label}</Label>
                    {_this.Control(param)}
                </Group>
    )
}

const preViewPending = ({ w2, _f, _this, param }) => {
    let _w2 = Math.floor(w2 / 3)
    let _w3 = w2 - _w2 * 2

    return (<>
        <Col sm={_w2}>
            {_this.Control({ ...param, st: 'active', irRead: true })}
        </Col>
        <Col sm={_w2}>
            {_f.pending ?
                <div className='field-pending'>
                    {this.Control({ ...param, st: 'pending', isRead: true })}
                </div>
                : null}
        </Col>

        {_p.isEdit ? <EditField sm={_w3} error={error}
            elem={this.Control(param)} />
            : null}
    </>)
}