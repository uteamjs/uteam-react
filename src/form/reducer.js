
import { merge, capitalize } from '..'
import { reduceDate } from './date'
import { utSectionActions } from './section'
import { utMultiAction } from './multiEdit'
import { utControlActions } from './control'
import { getField } from "../.."

const loop = (parent, child, cb) => child ?
    Object.entries(child).reduce((r, [key, link]) =>
        Object.assign(r, link.type && link.type.match(/group/i) ?
            loop(link, link.child, cb) : cb(parent, key, link)
        )
        , {})
    : null

export const initFields = state =>
    state.fieldList = loop(null, state.fields,
        (parent, key, link) => {
            link.label = link.label || capitalize(key)
            link.type = link.type || 'text'
            link.value = link.value === undefined ? (link.type === 'typeahead' ? [] : '') : link.value
            return {
                [key]: { link, parent }
            }
        })

export const utReducer = (name, o) => {

    const obj = merge(merge({
        name,
        init: {
            isEdit: true,
            isEditSection: {},
            isRow: true,
            apiStatus: '',
            labelWidth:
                [['2', '10'], ['4', '8'],
                ['6', '6'], ['6', '6']],
        },
        actions: {
            ...utControlActions,

            ...utMultiAction,

            ...utSectionActions,

            apiStatus: (state, p) => {
                state.apiStatus = p._api_status
            },

            popup: (state, obj) => state.popup = obj,

            errorMessage: (state, { id, index, msg, val }) => {
                const _f = getField(state, id, index)

                if (!(_f.valid && _f.valid.tight))
                    _f.value = val

                _f.error = msg
            },
        },
    }, reduceDate), o)

    initFields(obj.init)
    return obj
}