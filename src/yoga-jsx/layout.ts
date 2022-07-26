import Yoga from 'yoga-layout-prebuilt'

type Position = {
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
}

export const PositionRecord = (pos?: Position) => ({
  top: pos?.top || 0,
  right: pos?.right || 0,
  bottom: pos?.bottom || 0,
  left: pos?.left || 0
})

export const LayoutRecord = () => ({
  width: 'auto',
  height: 'auto',
  minWidth: 0,
  minHeight: 0,
  maxWidth: 'none',
  maxHeight: 'none',
  justifyContent: Yoga.JUSTIFY_FLEX_START,
  alignItems: Yoga.ALIGN_STRETCH,
  alignSelf: Yoga.ALIGN_AUTO,
  alignContent: Yoga.ALIGN_STRETCH,
  flexDirection: Yoga.FLEX_DIRECTION_ROW,
  position: PositionRecord({
    left: NaN,
    top: NaN,
    right: NaN,
    bottom: NaN
  }),
  positionType: Yoga.POSITION_TYPE_RELATIVE,
  flexWrap: Yoga.WRAP_NO_WRAP,
  flexBasis: 'auto',
  flexGrow: 0,
  flexShrink: 1,
  children: [],
  aspectRatio: 'auto'
})

export default LayoutRecord
