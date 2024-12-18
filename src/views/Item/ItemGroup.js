import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  getKeyOrValueAndKey,
} from '../../lib'
import Item from './Item'

/**
 * A group of items.
 */
const ItemGroup = React.forwardRef(function (props, ref) {
  const { children, className, content, divided, items, link, relaxed, unstackable } = props

  const classes = cx(
    'ui',
    getKeyOnly(divided, 'divided'),
    getKeyOnly(link, 'link'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOrValueAndKey(relaxed, 'relaxed'),
    'items',
    className,
  )
  const rest = getUnhandledProps(ItemGroup, props)
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

  const itemsJSX = _.map(items, (item) => {
    const { childKey, ...itemProps } = item
    const finalKey =
      childKey ??
      [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-')

    return <Item {...itemProps} key={finalKey} />
  })

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {itemsJSX}
    </ElementType>
  )
})

ItemGroup.displayName = 'ItemGroup'
ItemGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Items can be divided to better distinguish between grouped content. */
  divided: PropTypes.bool,

  /** Shorthand array of props for Item. */
  items: customPropTypes.collectionShorthand,

  /** An item can be formatted so that the entire contents link to another page. */
  link: PropTypes.bool,

  /** A group of items can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** Prevent items from stacking on mobile. */
  unstackable: PropTypes.bool,
}

export default ItemGroup
