import React from 'react'
import { FiEdit, FiChevronUp, FiChevronDown, FiSave } from 'react-icons/fi'
import { AiOutlineHourglass, AiOutlineCloudSync } from 'react-icons/ai'
import { style } from '../..'

export const utSectionActions = {
    toggleSection: (state, { id }) => {
        state.section = state.section || {}
        state.section[id] = !state.section[id]
    },

    load: (state, _) =>
        state.fields = _.fields,

    save: (state, { id }) => {
        state.isChanged = false
        const _f = state.fields[id] || state
        _f.isEdit = false
    },

    edit: (state, { id }) => {
        const _f = state.fields[id] || state
        _f.isEdit = true
    },

    pending: (state, { id }) => {
        const _f = state.fields[id] || state
        _f.isPending = !_f.isPending
    },

    cache: state => state.isCache = !state.isCache,
}


export const utSectionSave = _this => ({ id, call }) => () => call('save', { id })

export const utSection = _this => ({ id, Icon, title, backgroundColor, badge,
    className = '',
    drag, color,
    isCache = false, group,
    isPending = false, isSave = true,
    isCollapse = true,
    isEditable = true,
    PostAction,
    children }) => {

    const { LifeCycle, sectionSave, props } = _this
    const _ = props._ || props.init._
    const { call } = props

    const Collapse = () => {
        const FiIcon = _.section && _.section[id] ? FiChevronDown : FiChevronUp
        return <FiIcon size={style.iconSize} onClick={() => call('toggleSection', { id })} />
    }

    const Modify = () => {
        if (_.fields[id] ? _.fields[id].isEdit : _.isEdit)
            return <FiSave size={style.iconSize} onClick={sectionSave({ id, call })} />
        else
            return <FiEdit size={style.iconSize} onClick={() => {
                call('edit', { id })
            }
            } />
    }

    const _style = backgroundColor ? { backgroundColor } : {}

    if (color) _style.color = color

    let _props = { id, className: className + ' section ', }

    if (drag)
        _props = { ..._props, ...drag }

    return (
        <div {..._props}>
            <div {...{ style: _style }}>
                {Icon ?
                    <div className='section-icon'>
                        <Icon size={style.iconSize} />
                    </div>
                    : null}
                <div className='section-title'>{title}</div>
                <div className='section-action'>
                    {badge ? <div className='badge'>{badge}</div> : null}
                    {isPending && isEditable ? <AiOutlineHourglass size={style.iconSize}
                        onClick={() => call('pending', { id })}
                    /> : null}
                    {isCache && isEditable ? <AiOutlineCloudSync size={style.iconSize}
                        onClick={() => call('cache', { id })}
                    /> : null}
                    {isSave && isEditable ? <Modify /> : null}
                    {PostAction ? <PostAction /> : null}
                    {isCollapse ? <Collapse /> : null}

                </div>
            </div>
            <div className={_.section && _.section[id] ? 'hide' : ''} >
                {group ? <LifeCycle group={group} section={id} /> : children}
            </div>
        </div>
    )
}