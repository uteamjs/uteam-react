
import { getInitField, onChange, utfield } from './field'
import { utControl } from './control'
import { utInputDate } from './date'
import { utSection, utSectionSave } from './section'
import { utPopup, popup, popupClose, PopupModal } from './modal'
import { utButtonGroup, utForm, utColumns } from './container'
import { utView, goBack, getSelectedRowID } from './table'
import { isFunction } from 'lodash'

export const useForm = (_this, extend) => {
    ['onKeyPress', 'onKeyDown', 'fieldOnChange'].forEach(t => {
        if (!_this[t]) _this[t] = () => true
    })

    _this.getField = getInitField(_this)
    _this.onChange = onChange(_this)
    _this.Control = utControl(_this)
    _this.InputDate = utInputDate(_this)
    _this.PopupModal = PopupModal(_this)
    _this.ButtonGroup = utButtonGroup
    _this.Form = utForm(_this)
    _this.Columns = utColumns
    _this.Grid = utView(_this)
    _this.sectionSave = utSectionSave(_this)

    _this.goBack = goBack(_this)
    _this.getSelectedRowID = getSelectedRowID(_this)

    let _extend = {}

    if(isFunction(extend))
        _extend = extend(_this)

    return {
        getField: _this.getField,
        Control: _this.Control,
        Field: utfield(_this),
        Section: utSection(_this),
        popup: popup(_this),
        popupClose: popupClose(_this),
        PopupModal: _this.PopupModal,
        Popup: utPopup(_this),
        ButtonGroup: _this.ButtonGroup,
        Form: _this.Form,
        Columns: _this.Columns,
        Grid: _this.Grid,
        ..._extend
    }
}

