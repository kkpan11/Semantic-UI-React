import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
} from '../../lib'
import CardDescription from './CardDescription'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'

/**
 * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
 */
const CardContent = React.forwardRef(function (props, ref) {
  const { children, className, content, description, extra, header, meta, textAlign } = props

  const classes = cx(getKeyOnly(extra, 'extra'), getTextAlignProp(textAlign), 'content', className)
  const rest = getUnhandledProps(CardContent, props)
  const ElementType = getComponentType(props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(CardHeader, (val) => ({ content: val }), header, { autoGenerateKey: false })}
      {createShorthand(CardMeta, (val) => ({ content: val }), meta, { autoGenerateKey: false })}
      {createShorthand(CardDescription, (val) => ({ content: val }), description, {
        autoGenerateKey: false,
      })}
    </ElementType>
  )
})

CardContent.displayName = 'CardContent'
CardContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: customPropTypes.itemShorthand,

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for CardMeta. */
  meta: customPropTypes.itemShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}

export default CardContent
