import React from 'react'
import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from "@ag-grid-community/all-modules"

import '@ag-grid-community/core/dist/styles/ag-grid.min.css'
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css'

const _add =  comp => (id, Obj, func) => ({ 
    click:  { 
        cellRenderer: id,
        cellRendererParams: {clicked: func}
    },
    call: {
        [id]: ({clicked, data}) => 
            comp(Obj, clicked, data)
    }
})

export const addButton = _add((Obj, clicked, data) =>
    <center className='link'>
        <Obj onClick={() => clicked(data)} />
    </center>
)

export const addLink = _add((Obj, clicked, data) =>
    <a className='link' onClick={() => clicked(data)}>
        {data[Obj]}
    </a>
)

export const utView = _this => props => {
    const _ = _this.props._ || _this.props.init._
    
    const _props = {
        ...props,
        modules: AllCommunityModules,
        columnDefs: _.columns,
        rowData: _.rows
    }

    return(
        <div className="ag-theme-alpine" style={{...props.style}}>
            <AgGridReact {..._props} />
        </div>
    )
}

export const goBack = _this => () => _this.props.history.goBack()

export const getSelectedRowID = _this => () => _this.gridapi.getSelectedNodes().map(t => t.data.id)
