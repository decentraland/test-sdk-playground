import React, { useState } from 'react'
import Yoga from 'yoga-layout-prebuilt'

import { defaultLayout, YogaProps, PositionTypes, defaultPositionLayout } from './layout'

type ComputedLayout = {
  left: number
  top: number
  width: number
  height: number
  children: Array<ComputedLayout>
  node: Yoga.YogaNode
}

interface PropTypes extends YogaProps {
  children: React.ReactNode
  span: string
  isRootNode?: boolean
  computedLayout?: ComputedLayout
  parent?: string
}

function toYogaSetProp(value: string): keyof Yoga.YogaNode {
  return `set${value[0].toUpperCase()}${value.slice(1, value.length)}` as keyof Yoga.YogaNode
}

export const YogaJsx: React.FC<Partial<PropTypes>> = (props) => {
  const [rootNode, setNode] = useState<Yoga.YogaNode>()
  const [computedLayout, setLayout] = useState<ComputedLayout>()

  if (!props) return null

  function createYogaNodes(props: Partial<PropTypes>): Yoga.YogaNode {
    const node = Yoga.Node.create()
    if (!props) return node
    const layout = defaultLayout()
    for (const key in layout) {
      try {
        const propKey = (props as any)[key]
        const value = propKey ?? (layout as any)[key]
        ;(node as any)[toYogaSetProp(key)](value)
      } catch (e) {
        console.log(e, key, { props })
      }
    }

    const defaultPosition = defaultPositionLayout()
    for (const key in defaultPosition) {
      const typedKey: PositionTypes = key as PositionTypes
      const position = props[typedKey]

      if (!position) continue

      for (const pos in position) {
        const direction = `EDGE_${pos.toUpperCase()}` as keyof typeof Yoga
        const yogaDirection = Yoga[direction] as Yoga.YogaEdge

        if (pos === 'left' || pos === 'top' || pos === 'right' || pos === 'bottom') {
          ;(node[toYogaSetProp(key)] as typeof node.setPosition)(yogaDirection, position[pos])
        }
      }
    }

    node.setDisplay(Yoga.DISPLAY_FLEX)
    const children = React.Children.toArray(props.children)
    children
      .map((children) => createYogaNodes((children as any).props))
      .forEach((children, index) => node.insertChild(children, index))
    return node
  }

  function getComputedLayout(node: Yoga.YogaNode): ComputedLayout {
    return {
      ...node.getComputedLayout(),
      node,
      children: Array.from({ length: node.getChildCount() }, (_, i) => getComputedLayout(node.getChild(i)))
    }
  }

  function calculateLayout(): ComputedLayout | undefined {
    if (props.computedLayout) return undefined
    const root = createYogaNodes(props)
    setNode(root)
    root.calculateLayout(props.width as number, props.height as number, props.direction)
    const layout = getComputedLayout(root)
    setLayout(layout)
  }

  function getChildProps(index: number) {
    const children = React.Children.toArray(props.children)
    return (children[index] as any).props as Partial<PropTypes>
  }

  const layout = props.computedLayout || computedLayout || calculateLayout()!

  if (!layout) return null

  const { width, height, top, left, children } = layout
  const divStyle = rootNode
    ? { width, height, border: '1px solid', position: 'static' as const }
    : { width, height, top, left, position: 'absolute' as const, border: '1px solid' }
  return (
    <div style={divStyle}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        {props.span ? (props.parent ? `${props.parent}.${props.span}` : props.span) : 'root'}
      </div>
      {(children || []).map((children, index) => (
        <YogaJsx
          key={index}
          computedLayout={children}
          parent={props.span}
          span={`${index + 1}`}
          {...getChildProps(index)}
        />
      ))}
    </div>
  )
}

export const Pepe = 1

export default YogaJsx
