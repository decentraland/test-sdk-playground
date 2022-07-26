export const ecsTypes = `
  declare global {
    type DivProps = {
      children?: React.Children
      display?: 'flex'
    }
    type TextProps = {
      children?: string
    }
    declare function DivUi(props: any): IDiv
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
      <DivUi width={100} height={100} position={Yoga.POSITION_TYPE_ABSOLUTE} />
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
