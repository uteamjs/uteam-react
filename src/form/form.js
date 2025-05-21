import { Component } from "react"
import { pattern } from './validate'
export { pattern }

import { onBlur, onChange, getInitField, utfield } from './field'
import { utControl } from './control'
import { utInputDate } from './date'
import { utSection, utSectionSave } from './section'
import { utMultiEdit } from './multiEdit'
import { utPopup, popup, popupClose, PopupModal } from './modal'
import { utButtonGroup, utForm, utColumns } from './container'
import { utView, goBack, getSelectedRowID } from './table'


import 'react-day-picker/src/style.css'
import '../css/form.sass'

export class utform extends Component {

    Section = utSection(this)

    sectionSave = utSectionSave(this)

    MultiEdit = utMultiEdit(this)

    onKeyPress = () => { }

    onKeyDown = () => { }

    ButtonGroup = utButtonGroup

    Form = utForm(this)

    Columns = utColumns

    getField = getInitField(this)

    fieldOnBlur = () => true

    onBlur = onBlur(this)

    fieldOnChange = () => true

    onChange = onChange(this)

    Field = utfield(this)

    PopupModal = PopupModal(this)

    Popup = utPopup(this)

    popup = popup(this)

    popupClose = popupClose(this)

    InputDate = utInputDate(this)

    Control = utControl(this)

    Grid = utView(this)

    goBack = goBack(this)

    getSelectedRowID = getSelectedRowID(this)

    girdQuickSearch = params => e => {
        this.gridapi.setQuickFilter(e.target.value)
        this.onChange(params)(e)
    }

}
