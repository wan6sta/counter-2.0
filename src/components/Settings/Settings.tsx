import cls from './Settings.module.scss'
import {ChangeEvent, FC, useState} from 'react'
import {Button} from '../Button/Button';
import {Action, Actions} from '../../App';

interface SettingsProps {
  showSettings: boolean,
  initialCounterValue: number,
  maxCounterLimit: number,
  minCounterLimit: number
  setInitialValue: (action: Action) => void
}

export const Settings: FC<SettingsProps> = (props) => {
  const {
    showSettings,
    initialCounterValue,
    minCounterLimit,
    maxCounterLimit,
    setInitialValue
  } = props

  const settingsClassName = showSettings ? `${cls.Settings}` : `${cls.Settings} ${cls.hidden}`

  const [initialCounterValueTemp, setInitialCounterValueTemp] = useState(initialCounterValue)
  const [minCounterLimitTemp, setMinCounterLimitTemp] = useState(minCounterLimit)
  const [maxCounterLimitTemp, setMaxCounterLimitTemp] = useState(maxCounterLimit)

  const [initialValueError, setInitialValueError] = useState(false)
  const [minCounterLimitError, setMinCounterLimitError] = useState(false)
  const [maxCounterLimitError, setMaxCounterLimitError] = useState(false)

  const [finallyError, setFinallyError] = useState(false)

  const buttonDisable = initialValueError || minCounterLimitError || maxCounterLimitError

  const initialCounterValueTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(+e.currentTarget.value)

    if (value > +maxCounterLimitTemp || value < +minCounterLimitTemp) {
      setInitialValueError(true)
      return
    }

    setInitialValueError(false)
    setInitialCounterValueTemp(value)
  }

  const minCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(+e.currentTarget.value)

    if (value > +maxCounterLimitTemp || value > +initialCounterValueTemp) {
      setMinCounterLimitError(true)
      return
    }

    setMinCounterLimitError(false)
    setMinCounterLimitTemp(value)
  }

  const maxCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(+e.currentTarget.value)

    if (value < +minCounterLimitTemp || value < +initialCounterValueTemp) {
      setMaxCounterLimitError(true)
      return
    }

    setMaxCounterLimitError(false)
    setMaxCounterLimitTemp(value)
  }

  const setInitialDataHandler = () => {
    if (initialCounterValueTemp > maxCounterLimitTemp || initialCounterValueTemp < minCounterLimitTemp) {
      setFinallyError(true)
      return
    }

    if (minCounterLimitTemp > maxCounterLimitTemp || minCounterLimitTemp > initialCounterValueTemp) {
      setFinallyError(true)
      return
    }

    if (maxCounterLimitTemp < minCounterLimitTemp || maxCounterLimitTemp < initialCounterValueTemp) {
      setFinallyError(true)
      return
    }

    setFinallyError(false)


    const action = {
      type: Actions.SET_INITIAL_DATA,
      payload: {
        initialCounterValue: Math.round(+initialCounterValueTemp),
        maxCounterLimit: Math.round(+maxCounterLimitTemp),
        minCounterLimit: Math.round(+minCounterLimitTemp)
      }
    }

    setInitialValue(action)
  }

  return <div className={settingsClassName}>
    <div className={cls.settingsBlock}>
      <div className={cls.settingsItem}>
        <span>Start value</span>
        <input
          className={initialValueError ? cls.errorInput : ''}
          onChange={initialCounterValueTempHandler}
          value={initialCounterValueTemp}
          type="number"
        />
      </div>

      <div className={cls.settingsItem}>
        <span>Min value</span>
        <input
          className={minCounterLimitError ? cls.errorInput : ''}
          onChange={minCounterLimitTempHandler}
          value={minCounterLimitTemp}
          type="number"
        />
      </div>

      <div className={cls.settingsItem}>
        <span>Max value</span>
        <input
          className={maxCounterLimitError ? cls.errorInput : ''}
          onChange={maxCounterLimitTempHandler}
          value={maxCounterLimitTemp} type="number"
        />
      </div>
    </div>
    <Button onClick={setInitialDataHandler} disabled={buttonDisable}>Set</Button>
    {finallyError && <span className={cls.errorFinally}>Some error</span>}
  </div>
}

