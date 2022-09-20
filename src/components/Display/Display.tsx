import cls from './Display.module.scss'
import {FC} from 'react'

interface DisplayProps {
  counterCurrentValue: number
  disableInc: boolean
  disableDec: boolean
}

export const Display: FC<DisplayProps> = (props) => {
  const {counterCurrentValue, disableInc, disableDec} = props

  const displayClassname = disableInc || disableDec ? `${cls.Display} ${cls.error}` : `${cls.Display}`

  return <div className={displayClassname}>
    <div className={cls.boxCrazy}>
      {counterCurrentValue}
    </div>
  </div>
}

