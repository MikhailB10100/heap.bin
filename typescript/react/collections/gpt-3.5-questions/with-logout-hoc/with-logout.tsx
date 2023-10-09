import React, { FunctionComponent, MouseEventHandler } from 'react'

function withLogout<
  Props extends { onClick: MouseEventHandler<HTMLButtonElement> },
>(WrappedComponent: FunctionComponent<Props>) {
  return function WithLogout(props: Omit<Props, 'onClick'>) {
    const handleLogout = () => {
      console.log('Logout logic executed.')
    }

    return <WrappedComponent {...(props as Props)} onClick={handleLogout} />
  }
}

interface MobileLogoutButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

const MobileLogoutButton = ({ onClick }: MobileLogoutButtonProps) => (
  <button onClick={onClick}>Logout (Mobile)</button>
)

const MobileButtonWithLogout = withLogout(MobileLogoutButton)
