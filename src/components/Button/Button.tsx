import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = (props) => {
  const {disabled, children, ...otherProps} = props

  const buttonClassname = disabled ? `${cls.Button} ${cls.disabled}` : `${cls.Button}`

  return <button disabled={disabled} className={buttonClassname} {...otherProps}>
    {children}
  </button>
}

