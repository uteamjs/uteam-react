
export const getField = (state, id, index) =>
    typeof index === 'undefined' ?
        state.fieldList[id].link :
        state.fieldList[id].parent.rows[index][id]
