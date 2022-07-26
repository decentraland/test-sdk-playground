import React from 'react'
import Yoga from 'yoga-layout-prebuilt'
import YogaJsx from './yoga-jsx'

const Test = () => {
  return (
    <YogaJsx width={300} height={300} flexDirection={Yoga.FLEX_DIRECTION_ROW}>
      <YogaJsx width={100} height={100}>
        <YogaJsx width={100} height={100} />
        <YogaJsx width={100} height={100} />
      </YogaJsx>
      <YogaJsx width={100} height={100} position={Yoga.POSITION_TYPE_ABSOLUTE} />
      <YogaJsx width={100} height={100} />
      <YogaJsx width={100} height={100}>
        <YogaJsx width={100} height={100} />
        <YogaJsx width={100} height={100} />
      </YogaJsx>
    </YogaJsx>
  )
}

export default Test
