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
    if (+e.currentTarget.value > +maxCounterLimitTemp || +e.currentTarget.value < +minCounterLimitTemp) {
      setInitialValueError(true)
      return
    }

    setInitialValueError(false)
    setInitialCounterValueTemp(+e.currentTarget.value)
  }

  const minCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value > +maxCounterLimitTemp || +e.currentTarget.value > +initialCounterValueTemp) {
      setMinCounterLimitError(true)
      return
    }

    setMinCounterLimitError(false)
    setMinCounterLimitTemp(+e.currentTarget.value)
  }

  const maxCounterLimitTempHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value < +minCounterLimitTemp || +e.currentTarget.value < +initialCounterValueTemp) {
      setMaxCounterLimitError(true)
      return
    }

    setMaxCounterLimitError(false)
    setMaxCounterLimitTemp(+e.currentTarget.value)
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
        initialCounterValue: +initialCounterValueTemp,
        maxCounterLimit: +maxCounterLimitTemp,
        minCounterLimit: +minCounterLimitTemp
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

