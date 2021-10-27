import React from 'react'
import { BiTrash, BiAddToQueue } from 'react-icons/bi'
import { style } from '../..'

export const utMultiAction = {
    addGroup: (state, fields) => {
        const data = Object.keys(fields.child).reduce((r, key) => {
            r[key] = { value: '' }
            return r
        }, {})
        fields.rows.push(data)
    },

    deleteGroup: (state, { fields, i }) =>
        fields.rows.splice(i, 1)
}

export const utMultiEdit = _this => ({ group, fields, title }) => {
    const { FieldGroup } = _this
    const { _, call } = _this.props
    const _hide = _.isEdit || _.fields[group].isEdit  ? '' : 'hide'

    return (
        <div className='multi-edit'>
            <div>{title}
                <BiAddToQueue className={_hide}
                    onClick={() => call('addGroup', fields, () => {
                        console.log('scroll..', _this.multiEdit)
                        _this.multiEdit.scrollIntoView({block:'end', behavior: 'smooth'})
                    })}
                    size={style.iconSize} />
            </div>
            <div>
                <div ref={ref => (_this.multiEdit = ref)} >
                    {fields.rows.map((t, i) =>
                        <div key={'fg' + i} className='field-group-item '>
                            # {i + 1}
                            <BiTrash size={style.iconSize} className={_hide}
                                onClick={() => call('deleteGroup', { fields, i })} />
                            <FieldGroup name={group} index={i} />
                        </div>)}
                </div>
            </div>
        </div>
    )

}

