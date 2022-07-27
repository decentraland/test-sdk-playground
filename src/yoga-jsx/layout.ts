import Yoga from 'yoga-layout-prebuilt'

export type PositionTypes = 'position' | 'margin' | 'padding' | 'border'

export type Position = {
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
}
export interface YogaProps {
  display: Yoga.YogaDisplay
  justifyContent: Yoga.YogaJustifyContent
  positionType: Yoga.YogaPositionType
  alignItems: Yoga.YogaAlign
  alignSelf: Yoga.YogaAlign
  alignContent: Yoga.YogaAlign
  flexDirection: Yoga.YogaFlexDirection
  position: Position
  padding: Position
  margin: Position
  border: Position
  direction: Yoga.YogaDirection
  width: number | string
  height: number | string
  minWidth: number
  maxWidth: number
  minHeight: number
  maxHeight: number
  flexWrap: Yoga.YogaFlexWrap
  flexBasis: string | number
  flexGrow: number
  flexShrink: number
  aspectRatio: number | undefined
}

export const PositionRecord = (pos?: Position) => ({
  top: pos?.top ?? 0,
  right: pos?.right ?? 0,
  bottom: pos?.bottom ?? 0,
  left: pos?.left ?? 0
})

export const positionLayout = (): Pick<YogaProps, 'position' | 'padding' | 'margin' | 'border'> => ({
  position: PositionRecord({
    left: NaN,
    top: NaN,
    right: NaN,
    bottom: NaN
  }),
  padding: PositionRecord(),
  margin: PositionRecord(),
  border: PositionRecord()
})

export const LayoutRecord = (): Omit<
  YogaProps,
  'direction' | 'display' | 'flexBasis' | 'position' | 'padding' | 'margin' | 'border'
> => ({
  width: 'auto',
  height: 'auto',
  minWidth: NaN,
  minHeight: NaN,
  maxWidth: NaN,
  maxHeight: NaN,
  justifyContent: Yoga.JUSTIFY_FLEX_START,
  alignItems: Yoga.ALIGN_STRETCH,
  alignSelf: Yoga.ALIGN_AUTO,
  alignContent: Yoga.ALIGN_STRETCH,
  flexDirection: Yoga.FLEX_DIRECTION_ROW,
  positionType: Yoga.POSITION_TYPE_RELATIVE,
  flexWrap: Yoga.WRAP_NO_WRAP,
  flexGrow: 0,
  flexShrink: 1,
  aspectRatio: undefined
})

export default LayoutRecord
