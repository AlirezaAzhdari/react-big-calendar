import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'
import UseIsInViewPort from './hooks/useIsInViewPort'

export default class TimeSlotGroup extends Component {
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props

    const groupProps = getters ? getters.slotGroupProp(group) : {}
    return (
      <UseIsInViewPort groupProps={groupProps} className={'rbc-timeslot-group'}>
        <div className="rbc-timeslot-group" {...groupProps}>
          {group.map((value, idx) => {
            const slotProps = getters ? getters.slotProp(value, resource) : {}
            return (
              <Wrapper key={idx} value={value} resource={resource}>
                <div
                  {...slotProps}
                  className={clsx('rbc-time-slot', slotProps.className)}
                >
                  {renderSlot && renderSlot(value, idx)}
                </div>
              </Wrapper>
            )
          })}
        </div>
      </UseIsInViewPort>
    )
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
}
