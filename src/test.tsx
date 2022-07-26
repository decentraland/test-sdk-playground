import React from 'react'
import Yoga from 'yoga-layout-prebuilt'
import YogaJsx from './yoga-jsx'

const Test = () => {
  return (
    <YogaJsx width={300} height={300} flexDirection={Yoga.FLEX_DIRECTION_ROW} span="root">
      <YogaJsx span="1" width={100} height={100}>
        <YogaJsx span="1.1" width={100} height={100} />
        <YogaJsx span="1.2" width={100} height={100} />
      </YogaJsx>
      <YogaJsx span="2" width={100} height={100} position={Yoga.POSITION_TYPE_ABSOLUTE} />
      <YogaJsx span="3" width={100} height={100} />
      <YogaJsx span="4" width={100} height={100} />
    </YogaJsx>
  )
}

export default Test
