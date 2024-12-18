import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import RevealContent from './RevealContent'

/**
 * A reveal displays additional content in place of previous content when activated.
 */
const Reveal = React.forwardRef(function (props, ref) {
  const { active, animated, children, className, content, disabled, instant } = props

  const classes = cx(
    'ui',
    animated,
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(instant, 'instant'),
    'reveal',
    className,
  )
  const rest = getUnhandledProps(Reveal, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

Reveal.displayName = 'Reveal'
Reveal.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An active reveal displays its hidden content. */
  active: PropTypes.bool,

  /** An animation name that will be applied to Reveal. */
  animated: PropTypes.oneOf([
    'fade',
    'small fade',
    'move',
    'move right',
    'move up',
    'move down',
    'rotate',
    'rotate left',
  ]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A disabled reveal will not animate when hovered. */
  disabled: PropTypes.bool,

  /** An element can show its content without delay. */
  instant: PropTypes.bool,
}

Reveal.Content = RevealContent

export default Reveal
