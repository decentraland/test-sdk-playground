export const ecsTypes = `
  declare global {
    type DivProps = {
      children?: React.Children
      display?: 'flex'
    }
    type TextProps = {
      children?: string
    }
    declare function DivUi(props: DivProps): IDiv
    declare function TextUi(props: TextProps): IDiv
  }
`

export const defaultValue = `
function App() {
  return (
    <DivUi>
      <DivUi>
        <TextUi>Ecs 7</TextUi>
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
