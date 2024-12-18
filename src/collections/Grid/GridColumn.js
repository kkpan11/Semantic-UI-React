import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  customPropTypes,
  createShorthandFactory,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getMultipleProp,
  getTextAlignProp,
  getValueAndKey,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'

/**
 * A column sub-component for Grid.
 */
const GridColumn = React.forwardRef(function (props, ref) {
  const {
    children,
    className,
    computer,
    color,
    floated,
    largeScreen,
    mobile,
    only,
    stretched,
    tablet,
    textAlign,
    verticalAlign,
    widescreen,
    width,
  } = props

  const classes = cx(
    color,
    getKeyOnly(stretched, 'stretched'),
    getMultipleProp(only, 'only'),
    getTextAlignProp(textAlign),
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(computer, 'wide computer'),
    getWidthProp(largeScreen, 'wide large screen'),
    getWidthProp(mobile, 'wide mobile'),
    getWidthProp(tablet, 'wide tablet'),
    getWidthProp(widescreen, 'wide widescreen'),
    getWidthProp(width, 'wide'),
    'column',
    className,
  )
  const rest = getUnhandledProps(GridColumn, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})

GridColumn.displayName = 'GridColumn'
GridColumn.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A grid column can be colored. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A column can specify a width for a computer. */
  computer: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),

  /** A column can sit flush against the left or right edge of a row. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A column can specify a width for a large screen device. */
  largeScreen: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),

  /** A column can specify a width for a mobile device. */
  mobile: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can appear only for a specific device, or screen sizes. */
  only: customPropTypes.multipleProp(SUI.VISIBILITY),

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: PropTypes.bool,

  /** A column can specify a width for a tablet device. */
  tablet: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can specify its text alignment. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A column can specify a width for a wide screen device. */
  widescreen: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),

  /** Represents width of column. */
  width: customPropTypes.every([
    customPropTypes.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),
}

GridColumn.create = createShorthandFactory(GridColumn, (children) => ({ children }))

export default GridColumn
