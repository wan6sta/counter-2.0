import {Display} from './components/Display/Display';
import {Button} from './components/Button/Button';
import {useReducer} from 'react';
import {SettingsButton} from './components/SettingsButton/SettingsButton';
import {Settings} from './components/Settings/Settings';
import {checkValue} from './helpers/checkValue';

export enum Actions {
  SET_SHOW_SETTINGS = 'SET_SHOW_SETTINGS',

  SET_COUNTER_INC = 'SET_COUNTER_INC',
  SET_COUNTER_DEC = 'SET_COUNTER_DEC',
  SET_COUNTER_RESET = 'SET_COUNTER_RESET',

  SET_INITIAL_DATA = 'SET_INITIAL_DATA'
}

enum localStorageKeys {
  initialCounterValue = 'initialCounterValue',

  currentCounterValue = 'currentCounterValue',
  maxCounterLimit = 'maxCounterLimit',
  minCounterLimit = 'minCounterLimit'
}

export type Action = {
  type: string
  payload?: any
}

type InitialState = {
  showSettings: boolean
  currentCounterValue: number

  initialCounterValue: number
  maxCounterLimit: number
  minCounterLimit: number
}

const initialCounterValue = localStorage.getItem(localStorageKeys.initialCounterValue)
const minCounterLimit = localStorage.getItem(localStorageKeys.minCounterLimit)
const maxCounterLimit = localStorage.getItem(localStorageKeys.maxCounterLimit)

const initialState: InitialState = {
  showSettings: false,
  currentCounterValue: JSON.parse(initialCounterValue ? initialCounterValue : '0'),

  initialCounterValue: JSON.parse(initialCounterValue ? initialCounterValue : '0'),
  minCounterLimit: JSON.parse(minCounterLimit ? minCounterLimit : '-10'),
  maxCounterLimit: JSON.parse(maxCounterLimit ? maxCounterLimit : '10'),
}

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    case Actions.SET_SHOW_SETTINGS:
      return {
        ...state,
        showSettings: !state.showSettings
      }

    case Actions.SET_COUNTER_INC:
      if (state.currentCounterValue >= state.maxCounterLimit) {
        return state
      }

      return {
        ...state,
        currentCounterValue: state.currentCounterValue + 1
      }

    case Actions.SET_COUNTER_DEC:
      if (state.currentCounterValue <= state.minCounterLimit) {
        return state
      }

      return {
        ...state,
        currentCounterValue: state.currentCounterValue - 1,
      }

    case Actions.SET_COUNTER_RESET:
      if (state.currentCounterValue === state.initialCounterValue) {
        return state
      }

      return {
        ...state,
        currentCounterValue: state.initialCounterValue
      }

    case Actions.SET_INITIAL_DATA:
      localStorage.setItem(localStorageKeys.initialCounterValue, JSON.stringify(action.payload.initialCounterValue))
      localStorage.setItem(localStorageKeys.minCounterLimit, JSON.stringify(action.payload.minCounterLimit))
      localStorage.setItem(localStorageKeys.maxCounterLimit, JSON.stringify(action.payload.maxCounterLimit))

      if (checkValue(
        action.payload.initialCounterValue,
        action.payload.minCounterLimit,
        action.payload.maxCounterLimit) === 'error'
      ) {
        return state
      }

      return {
        ...state,
        initialCounterValue: action.payload.initialCounterValue,
        minCounterLimit: action.payload.minCounterLimit,
        maxCounterLimit: action.payload.maxCounterLimit,
        currentCounterValue: action.payload.initialCounterValue
      }

    default:
      return state
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const settingsClassName = state.showSettings ? 'counter counterUp' : 'counter'

  const disableReset = state.currentCounterValue === state.initialCounterValue
  const disableInc = state.currentCounterValue >= state.maxCounterLimit
  const disableDec = state.currentCounterValue <= state.minCounterLimit

  const showSettingsHandler = () => {
    dispatch({type: Actions.SET_SHOW_SETTINGS})
  }

  const counterInc = () => {
    dispatch({type: Actions.SET_COUNTER_INC})
  }

  const counterDec = () => {
    dispatch({type: Actions.SET_COUNTER_DEC})
  }

  const counterReset = () => {
    dispatch({type: Actions.SET_COUNTER_RESET})
  }

  const setInitialValue = (action: Action) => {
    dispatch(action)
  }

  return <div className='app'>
    <div className={settingsClassName}>
      <Display
        disableInc={disableInc}
        disableDec={disableDec}
        counterCurrentValue={state.currentCounterValue}
      />

      <div className='buttons'>
        <Button
          disabled={disableDec}
          onClick={counterDec}
        >
          -
        </Button>
        <Button
          disabled={disableInc}
          onClick={counterInc}
        >
          +
        </Button>
        <Button
          disabled={disableReset}
          onClick={counterReset}
        >
          reset
        </Button>
      </div>

      <SettingsButton showSettingsHandler={showSettingsHandler}/>

      <Settings
        setInitialValue={setInitialValue}
        initialCounterValue={state.initialCounterValue}
        maxCounterLimit={state.maxCounterLimit}
        minCounterLimit={state.minCounterLimit}

        showSettings={state.showSettings}
      />
    </div>
  </div>
}

