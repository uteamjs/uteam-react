import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

export const utButtonGroup = props => {
    let _props

    if (props.left)
        _props = { style: { float: 'none' } }

    return (
        <div className='button-group'>
            <div {..._props}>
                {props.children}
            </div>
        </div>
    )
}

export const utForm = _this => ({ isConfirm = true, className, children }) => {
    const _ = _this.props._ || _this.props.init._
    const { isChanged } = _this.props._

    return (
        <Form className={className}>
            <Prompt when={isConfirm && isChanged === true} message={location =>
                `Input not saved!\nAre you sure you want to go to ${location.pathname}?`} />
            {children}
        </Form>
    )
}

export const utColumns = ({ children, width }) =>
    <Row>
        {children.map((t, i) => {
            const _props = {
                key: i
            }
            if (width)
                _props.sm = width[i]

            return (
                <Col {..._props}>{t}</Col>)
        }
        )}
    </Row>
