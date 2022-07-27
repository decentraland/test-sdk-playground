export const ecsTypes = `
  declare global {
    export type Position = {
      top?: number | string
      right?: number | string
      bottom?: number | string
      left?: number | string
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
      children: React.ReactNode
    }
    type TextProps = {
      children?: string
    }
    declare function DivUi(props: Partial<YogaProps>): IDiv
    declare function TextUi(props: any): IDiv
  }
`

export const defaultValue = `
function App() {
  return (
    <DivUi width={300} height={300} flexDirection={Yoga.FLEX_DIRECTION_ROW}>
      <DivUi width={100} height={100}>
        <DivUi width={100} height={100} />
        <DivUi width={100} height={100} />
      </DivUi>
      <DivUi width={100} height={100} positionType={Yoga.POSITION_TYPE_ABSOLUTE} />
      <DivUi width={100} height={100} />
      <DivUi width={100} height={100}>
        <DivUi width={100} height={100} />
        <DivUi width={100} height={100} />
      </DivUi>
    </DivUi>
  )
}
`

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: NodeJS.Timeout | null = null
  return function (this: any, ...args: any[]) {
    timeoutID && clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  } as F
}
