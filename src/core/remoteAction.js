import fetch from 'isomorphic-fetch'
import { toastMessage } from './util'

//import { toast } from 'react-toastify'

const getUploadBody = action => {
  const formData = new FormData(), { ref, type, payload } = action
  const files = payload.files || []

  formData.append('ref', ref)
  formData.append('server', 'api')
  formData.append('type', type)

  for (let i in files)
    formData.append('file', files[i])

  delete payload.files

  formData.append('payload', JSON.stringify(payload))

  return formData
}


export const api = store => next => action => {

  switch (action.server) {
    case 'api':

      if (action.server === 'api') {
        action.payload = action.payload || {}

        const s = action.type
        let headers, body, type

        if (s.substring(s.lastIndexOf('/') + 1).match(/upload/)) {
          body = getUploadBody(action)
          headers = {} // 'Content-Type': 'multipart/form-data' }
          type = 'upload'

        } else {
          body = JSON.stringify(action)
          headers = { 'Content-Type': 'application/json' }

          const _token = sessionStorage.getItem('cfd61b8a7397fa7c10b2ae548f5bfaef')

          if (_token) {
            if (process.env.JWT_BEARER?.toLowerCase() === 'true')
              headers.Authorization = 'Bearer ' + _token
            else
              headers.token = _token
          }

          type = 'api'
        }

        fetch(process.env.API_URL + type, {
          credentials: 'include',
          method: 'POST',
          headers, body,
          //body: JSON.stringify(action)
        }).then(res => {

          if (res.status >= 400) {
            throw new Error('Bad response - status ' + res.status)

          } else {
            const _token = res.headers.get('token')

            if (_token)
            sessionStorage.setItem('cfd61b8a7397fa7c10b2ae548f5bfaef', _token)

            return res.json()
          }

        }).then(data => {

          if(data.timeout) {
            alert('Session timeout, please click Ok to login again.')
            location.reload()
          }


          if (data.bear_token_) {
            sessionStorage.setItem('cfd61b8a7397fa7c10b2ae548f5bfaef', data.bear_token_)
            delete data.bear_token_
          }

          toastMessage(data.message)

          data.payload = {...data.payload, reqPayload: action.payload}

          if (action.next)
            setTimeout(() => action.next(data))

          return next(data)

        }).catch((err) => {
          console.log(err)
          //alert(err)
          if (action.next)
            setTimeout(() => action.next(action))

          return next(action)
        })
      }
      break;

    case 'none':
    case 'call':
      const m = action.type.match(/\/alert[^\/]*$/)

      if (m)
        toastMessage(action.payload)

    // continue to below

    default:
      if (action.next)
        setTimeout(() => action.next(action))

      return next(action)
  }
}


function error(store, message) {
  if (!message)
    return

  const id = '1244' //uid(8) 

  store.dispatch({
    type: '@error',
    payload: { ...message, id }
  })

  if (message.tp !== 'error')
    setTimeout(() => store.dispatch({
      type: '@error.remove',
      payload: id
    }), message.tp === 'warn' ? 6000 : 2500)
  else {
    // AlertPopup('System Error', () => {
    //   window.location.href = "/logout"
    // })
  }
}
