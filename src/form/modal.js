import React from 'react'
import { Modal } from 'react-bootstrap'
import { Loading } from '@uteamjs/react'
// Popup
export const PopupModal = _this => ({ show, close, title, children, isLoading = false, size = 'lg', param }) => {
    const { Header, Title, Body } = Modal
    const { call } = _this.props
    const _close = close || (() => call('popup', null))

    return (
        <Modal show={show} onHide={_close} centered size={size}>
            {_close || title ?
                <Header closeButton={_close}>
                    {title ? <Title>{title}</Title> : null}
                </Header>
                : null}
            <Body>
                {/*children.$$typeof &&
                    children.$$typeof == Symbol.for('react.lazy')*/true ?
                        <Loading>{children}</Loading> :
                        children
                }
            </Body>
        </Modal>
    )
}

// Place in form content
export const utPopup = _this => () => {
    const { PopupModal } = _this
    const _ = _this.props._ || _this.props.init._
    const { popup } = _

    if (!popup) return null

    const { Elem, props } = popup
    return (Elem ?
        <PopupModal {...{ show: true, ...props }}>
            <Elem key='pop-main' />
        </PopupModal>
        : null)
}

// Call by actions
export const popup = _this => (Elem, props) => () => {
    _this.props.call('popup', { Elem, props })
}

export const popupClose = _this => () => 
    _this.props.call('popup', null)

