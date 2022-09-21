import cls from './Settings.module.scss'
import {ChangeEvent, FC, useEffect, useState} from 'react'
import {Button} from '../Button/Button';
import {Action, Actions} from '../../App';

interface SettingsProps {
  showSettings: boolean

  initialCounterValue: number
  maxCounterLimit: number
  minCounterLimit: number

  setInitialValue: (action: Action) => void
}

export const Settings: FC<SettingsProps> = (props) => {
  const {
    showSettings,
    ...otherProps
  } = props

  const settingsClassName = showSettings ? `${cls.Settings}` : `${cls.Settings} ${cls.hidden}`

  const [initialValue, setInitialValue] = useState(String(otherProps.initialCounterValue))
  const [minLimit, setMinLimit] = useState(String(otherProps.minCounterLimit))
  const [maxLimit, setMaxLimit] = useState(String(otherProps.maxCounterLimit))

  const [initialValueError, setInitialValueError] = useState(false)
  const [minLimitError, setMinLimitError] = useState(false)
  const [maxLimitError, setMaxLimitError] = useState(false)

  const [finallyError, setFinallyError] = useState(false)

  useEffect(() => {
    if (initialValueError || minLimitError || maxLimitError) {
      setFinallyError(prev => true)
      return
    }

    setFinallyError(prev => false)
  }, [initialValueError, minLimitError, maxLimitError])

  //const disableButton = initialValueError ||  minLimitError || maxLimitError

  useEffect(() => {
    if (+initialValue >= +maxLimit || +initialValue <= +minLimit) {
      setInitialValueError(prev => true)
      return
    }
  }, [initialValue])


  useEffect(() => {
    if (+minLimit >= +maxLimit || +minLimit >= +initialValue) {
      setMinLimitError(prev => true)
      return
    }

  }, [minLimit])

  useEffect(() => {
    if (+maxLimit <= +minLimit || +maxLimit <= +initialValue) {
      setMaxLimitError(prev => true)
      return
    }

  }, [maxLimit])

  const initialValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(parseInt(e.currentTarget.value))
    setInitialValue(prev => String(value))

    setInitialValueError(prev => false)
  }

  const minCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(parseInt(e.currentTarget.value))


    setMinLimitError(prev => false)
    setMinLimit(prev => String(value))
  }

  const maxCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(parseInt(e.currentTarget.value))

    setMaxLimitError(prev => false)
    setMaxLimit(prev => String(value))
  }

  const setInitialDataHandler = () => {

    const action = {
      type: Actions.SET_INITIAL_DATA,
      payload: {
        initialCounterValue: +initialValue,
        maxCounterLimit: +maxLimit,
        minCounterLimit: +minLimit
      }
    }

    otherProps.setInitialValue(action)
  }

  return <div className={settingsClassName}>
    <div className={cls.settingsBlock}>
      <div className={cls.settingsItem}>
        <span>Start value</span>
        <input
          className={initialValueError ? cls.errorInput : ''}
          onChange={initialValueHandler}
          value={initialValue}
          type="number"
        />
      </div>

      <div className={cls.settingsItem}>
        <span>Min value</span>
        <input
          className={minLimitError ? cls.errorInput : ''}
          onChange={minCounterLimitTempHandler}
          value={minLimit}
          type="number"
        />
      </div>

      <div className={cls.settingsItem}>
        <span>Max value</span>
        <input
          className={maxLimitError ? cls.errorInput : ''}
          onChange={maxCounterLimitTempHandler}
          value={maxLimit} type="number"
        />
      </div>
    </div>
    <Button onClick={setInitialDataHandler} disabled={finallyError}>Set</Button>
    {finallyError && <span className={cls.errorFinally}>Some error</span>}
  </div>
}

