import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import { getUnhandledProps, getKeyOnly } from '../../lib'
import AccordionAccordion from './AccordionAccordion'
import AccordionContent from './AccordionContent'
import AccordionPanel from './AccordionPanel'
import AccordionTitle from './AccordionTitle'

/**
 * An accordion allows users to toggle the display of sections of content.
 */
const Accordion = React.forwardRef(function (props, ref) {
  const { className, fluid, inverted, styled } = props

  const classes = cx(
    'ui',
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(styled, 'styled'),
    className,
  )
  const rest = getUnhandledProps(Accordion, props)

  // TODO: extract behavior into useAccordion() hook instead of "AccordionAccordion" component
  return <AccordionAccordion {...rest} className={classes} ref={ref} />
})

Accordion.displayName = 'Accordion'
Accordion.propTypes = {
  /** Additional classes. */
  className: PropTypes.string,

  /** Format to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Format for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Adds some basic styling to accordion panels. */
  styled: PropTypes.bool,
}

Accordion.Accordion = AccordionAccordion
Accordion.Content = AccordionContent
Accordion.Panel = AccordionPanel
Accordion.Title = AccordionTitle

export default Accordion
