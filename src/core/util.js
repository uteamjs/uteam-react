import React from 'react'
import { Button } from "react-bootstrap"
import { Suspense, lazy } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { reduce } from "lodash"

export const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1)

export const extractFields = fields => reduce(fields, (a, v, k) => {
    a[k] = v.value
    return a
}, {})

export const extractMenuItem = (route, exclude = []) =>
    Object.keys(route).reduce((a, t) => {
        if (!exclude.includes(t))
            a[t] = capitalize(t)
        return a
    }, {})

export const routeLazy = list =>
    Object.entries(list).reduce((a, [key, value]) => {
        a[key] = lazy(() => value)
        return a
    }, {})

/**
 * Call React.Suspense with "Loading..."" message
 * @param {children} param0 
 * @returns  
 */

export const Loading = ({ children }) =>
    <Suspense fallback={<center>Loading...</center>}>
        {children}
    </Suspense>

const DetailPage = ({ children }) =>
    <div className='detail-page'>
        <div className='center'>
            <div>
                <Button id='ut-pop-close' onClick={() => window.history.back()} >
                    Close
                </Button>
            </div>
            {children}
        </div>
    </div>

export const SwitchRoute = ({ route, defaultRoute, prefix = '/', isBackGround = false }) => {
    if (prefix !== '/')
        prefix = '/' + prefix.replace(/^\/|\/$/g, '') + '/'

    return (
        <Switch>
            {defaultRoute ?
                <Route exact path='/'>
                    <Redirect to={defaultRoute} />
                </Route>
                : null}
            {Object.entries(route).map(([path, Elem]) =>
                <Route key={'key_' + path}
                    path={prefix + path} replace
                    render={routeProps =>
                        Elem.$$typeof && Elem.$$typeof == Symbol.for('react.lazy') ?
                            <Loading>
                                {isBackGround ?
                                    <DetailPage {...routeProps}>
                                        <Elem {...routeProps} />
                                    </DetailPage> :
                                    <Elem {...routeProps} />
                                }
                            </Loading> :
                            <Elem {...routeProps} />
                    }
                />
            )}
        </Switch>
    )
}

function isObject(item) {
    return (item && item.$$typeof === undefined
        && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}
/**
 * Get URL parameter ?name=Value
 */
export function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function updateValue(state, obj) {
    if (obj)
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] == 'string' || typeof obj[key] == 'number') {
                if (!state[key]) state[key] = {}
                state[key].value = obj[key]
            }
            else if (obj[key] && typeof obj[key] == 'object') {
                if (!state[key]) state[key] = {}
                for (const key2 of Object.keys(obj[key])) {
                    state[key][key2] = obj[key][key2]
                }
            }
        }
    return state
}

/*  Convert
    { 'key': {
      'value': val
    }}
    to {
      'key': val
    }
*/


export function getValue(obj) {
    let result = {}
    if (obj)
        for (const key of Object.keys(obj)) {
            result[key] = obj[key]['value'];
        }
    return result
}

// Get URI query string
// Return - key:value pair object

export function getQuery(location) {
    return location.search.slice(1)
        .split('&').reduce((a, t) => {
            const [k, v] = t.split('=')
            a[k] = v
            return a
        }, {})
}