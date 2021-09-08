import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import config from 'config/config'
import { SET_LANG } from 'store/actionTypes/configActionType'

interface IProps {
  reduxInitialLang: (type: string) => Promise<void>
}
const InitialProvider: React.FC<IProps> = (props): ReactElement => {
  const [spinning, setSpinning] = useState(true)
  const { reduxInitialLang } = props

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('currentLocale')) {
        await reduxInitialLang(localStorage.getItem('currentLocale')!)
      } else {
        if (config.locale) {
          await reduxInitialLang(config.locale)
        }
      }
      setSpinning(false)
    })()
  }, [])

  return (
    <Fragment>
      {
        spinning
          ? <div
              style={{
                width: '100%',
                height: '100%'
              }}
            >
            </div>
          : props.children
      }
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    reduxInitialLang: async (type: string) => {
      if (type === 'zh_CN') {
        const lang = (await import('locales/zh_CN')).default
        dispatch({
          type: type,
          payload: lang
        })
      }
      if (type === 'en_US') {
        const lang = (await import('locales/en_US')).default
        dispatch({
          type: type,
          payload: lang
        })
      }
      dispatch({
        type: SET_LANG,
        payload: type
      })
    }
  }
}
export default connect(null, mapDispatchToProps)(InitialProvider)
