import cls from './SettingsButton.module.scss'
import {FC} from 'react'
import settingsIcon from '../../assets/settings2.png';

interface SettingsButtonProps {
  showSettingsHandler: () => void
}

export const SettingsButton: FC<SettingsButtonProps> = (props) => {
  const {showSettingsHandler} = props

  return <div
    onClick={showSettingsHandler}
    className={cls.SettingsButton}
  >
    <img src={settingsIcon} alt="settings"/>
  </div>
}

