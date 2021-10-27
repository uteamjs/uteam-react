import fetch from 'isomorphic-fetch'
import { each } from 'lodash'
import { toast } from 'react-toastify'

export const api = store => next => action => {
  switch (action.server) {
    case 'api':

      if (action.server === 'api') {
        action.payload = action.payload || {}


        fetch(process.env.API_URL + 'api', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action)

        }).then(res => {
          if (res.status >= 400)
            throw new Error('Bad response - status ' + res.status);


          return res.json()

        }).then(data => {
          const { message } = data
          const type = {
            'info': { autoClose: 1500, hideProgressBar: true },
            'warn': {},
            'error': { autoClose: false }
          }

          each(type, (opt, tp) => {
            if (message[tp])
              message[tp].forEach(t => toast[tp](t, opt))
          })

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

/*
const getUploadBody = action => {
  const formData = new FormData(), {ref, type, files = []} = action

  formData.append('ref', ref)
  formData.append('server', 'api')
  formData.append('type', type)
  files.forEach(f => {
    formData.append('file', f)
  })

  return formData
}

const catchFtn = (store, next, action, msg) => e => {
  console.log(msg)
  console.log(e)
  error(store, {
    tp: 'error',
    text: action.type + '- api',
    error:[e.message]
  })
  return next(action);
}*/

