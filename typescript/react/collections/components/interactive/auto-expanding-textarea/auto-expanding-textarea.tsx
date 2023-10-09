import React, { useLayoutEffect, useRef } from 'react'
/*
  classnames – library for merging css classes
  https://www.npmjs.com/package/classnames
 */
import * as cn from 'classnames'

export interface AutoExpandingTextareaProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    React.AriaAttributes {
  minHeight: number
}

function AutoExpandingTextarea({
  minHeight,
  className,
  ...props
}: AutoExpandingTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useLayoutEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        minHeight
      )}px`
    }
  }, [textareaRef?.current?.value, minHeight])

  return (
    <textarea
      ref={textareaRef}
      {/*
        tailwindcss class
        https://tailwindcss.com/docs/resize
        */}
      className={cn('resize-none', className)}
      {...props}
    />
  )
}

export default AutoExpandingTextarea
