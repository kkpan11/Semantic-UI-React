import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * A table row can have cells.
 */
const TableCell = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    collapsing,
    content,
    disabled,
    error,
    icon,
    negative,
    positive,
    selectable,
    singleLine,
    textAlign,
    verticalAlign,
    warning,
    width,
  } = props

  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(collapsing, 'collapsing'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(selectable, 'selectable'),
    getKeyOnly(singleLine, 'single line'),
    getKeyOnly(warning, 'warning'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(width, 'wide'),
    className,
  )
  const rest = getUnhandledProps(TableCell, props)
  const ElementType = getComponentType(props, { defaultAs: 'td' })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {Icon.create(icon)}
      {content}
    </ElementType>
  )
})

TableCell.displayName = 'TableCell'
TableCell.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A cell can be active or selected by a user. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A cell can be disabled. */
  disabled: PropTypes.bool,

  /** A cell may call attention to an error or a negative value. */
  error: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: customPropTypes.itemShorthand,

  /** A cell may let a user know whether a value is bad. */
  negative: PropTypes.bool,

  /** A cell may let a user know whether a value is good. */
  positive: PropTypes.bool,

  /** A cell can be selectable. */
  selectable: PropTypes.bool,

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table cell can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table cell can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A cell may warn a user. */
  warning: PropTypes.bool,

  /** A table can specify the width of individual columns independently. */
  width: PropTypes.oneOf(SUI.WIDTHS),
}

TableCell.create = createShorthandFactory(TableCell, (content) => ({ content }))

export default TableCell
