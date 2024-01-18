import React from 'react'
import Nav from 'react-bootstrap/Nav'


export const TabBar = ({ children, tabKey }) =>
    <Nav variant="tabs" defaultActiveKey={tabKey}>
        {children}
    </Nav>


export const TabItem = ({ href, eventKey, caption, classname }) =>
    <Nav.Item>
        <Nav.Link href={href} eventKey={eventKey} className={classname}>{caption}</Nav.Link>
    </Nav.Item>