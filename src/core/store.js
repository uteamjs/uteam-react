import React from 'react'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider, connect, useSelector } from 'react-redux'
import { HashRouter as Router } from "react-router-dom"
import { useForm } from '..'
import { api } from './remoteAction'

//const context = createContext(null)
const error = (state = { item: 'home' }, action) => {
    switch (action.type) {
        case 'click':
            return { item: action.payload.item }

        default:
            return state;
    }
}

//export const useSelector = createSelectorHook(context)
export const RouterStore = props =>
    <Provider store={store}>
        <Router>
            {props.children}
        </Router>
    </Provider>

let reducers = { '@global': error }

export const store = createStore(combineReducers(reducers), {}, applyMiddleware(api))

export const storeCall = (tp, func, payload, next, name = '@global') => {
    const i = func.lastIndexOf('/')

    //console.log(i, func)

    if (i > 0) {
        name = func.substring(0, i)
        func = func.substring(i + 1)
    }
    //console.log(name, func)

    store.dispatch({
        payload, ref: name,
        type: name + '/' + func,
        server: tp,
        next
    })
}

export const storeDelete = ({ name }) => {
    delete reducers[name]
    store.replaceReducer(combineReducers(reducers))
}

const _call_api = _r => tp => (func, payload, next) => {

    if (process.env.API_STATUS === 'true' && tp === 'api') {

        const i = func.lastIndexOf('/')
        const pre_apiStatus = i > 0 ? func.substring(0, i + 1) : ''

        /*
        storeCall('call', pre_apiStatus + 'apiStatus', { _api_status: 'waiting' },
            () => storeCall(tp, func, payload,
                res => storeCall('call', pre_apiStatus + 'apiStatus', {
                    ...res.payload, _api_status: 'isReady'
                }, next, _r.name)
                , _r.name)
            , _r.name)
        */

        storeCall('call', pre_apiStatus + 'apiStatus', { _api_status: 'waiting' },
            () => storeCall(tp, func, payload, next, _r.name)
            , _r.name)

    } else
        storeCall(tp, func, payload, next, _r.name)
}


const _connect = (mod, init, _r) => {

    const _call = _call_api(_r)

    if (typeof mod.layout === 'function') {

        if (!!mod.layout.prototype.isReactComponent)
            // Class component
            return connect(
                state => ({
                    //** _: state[_r.name],
                    _: state[_r.name]._,
                    name: _r.name,
                    get: s => state[s]._,   // Get other packages'states
                    api: _call('api'),
                    call: _call('none'),
                    ...init
                }))(mod.layout)

        else {
            return props => {
                const init = useSelector(t => t[mod.name])
                const param = {
                    name: _r.name,
                    get: s => state[s]._,
                    api: _call('api'),
                    call: _call('none')
                }

                if (!mod.content)
                    mod.content = useForm({
                        props: {
                            ...param,
                            init,
                        }, ...mod.param
                    }, mod.param?.extend)

                return mod.layout({
                    ...{ ...param, _: init._ }, ...init, ...props, ...mod.content
                })
            }
        }
    }

    return mod.layout
}

export const utCreateElement = (mod, init) => {
    console.log('...initialize ' + mod.reducer.name)

    const _r = mod.reducer

    const _call = _call_api(_r)

    //** const _reducer = (state = _r.init, action) => {
    const _reducer = (state = { _: _r.init }, action) => {

        if (_r.actions) {
            const _m = _r.name + '/'
            const i = action.type.indexOf(_m)

            if (i >= 0) {
                const _f = _r.actions[action.type.substring(i + _m.length)]
                if (_f) {
                    try {
                        _f(state._, action.payload, {
                            api: _call('api'),
                            call: _call('none')
                        })
                    } catch (err) {
                        console.log(err)
                        return state
                    }

                    if (process.env.API_STATUS === 'true')
                        state._.apiStatus = 'isReady'

                    return Object.assign({}, state)
                }
            }
        }

        return state
    }

    // Check _r.name exit or not

    reducers = {
        ...reducers, ...{
            [_r.name]: _reducer
        }
    }

    store.replaceReducer(combineReducers(reducers))

    return _connect(mod, init, _r)
}


export const utBindElement = (mod, init) => {
    console.log('...blinding ' + mod.name)

    return _connect(mod, init, mod)
}

