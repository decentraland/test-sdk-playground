import React, { useState } from 'react'
import Yoga from 'yoga-layout-prebuilt'

import { LayoutRecord } from './layout'

type ComputedLayout = {
  left: number
  top: number
  width: number
  height: number
  children: Array<ComputedLayout>
  node: Yoga.YogaNode
}

interface PropTypes {
  display: Yoga.YogaDisplay
  justifyContent: Yoga.YogaJustifyContent
  position: Yoga.YogaPositionType
  alignItems: Yoga.YogaAlign
  alignSelf: Yoga.YogaAlign
  alignContent: Yoga.YogaAlign
  flexDirection: Yoga.YogaFlexDirection
  positionTop: number | string
  positionLeft: number | string
  positionRight: number | string
  positionBottom: number | string
  width: number
  height: number
  children: React.ReactNode
  span: string
  isRootNode?: boolean
  direction: Yoga.YogaDirection
  computedLayout?: ComputedLayout
}

export const YogaJsx: React.FC<Partial<PropTypes>> = (props) => {
  const [rootNode, setNode] = useState<Yoga.YogaNode>()
  const [computedLayout, setLayout] = useState<ComputedLayout>()
  function createYogaNodes(props: Partial<PropTypes>): Yoga.YogaNode {
    const node = Yoga.Node.create()
    const defaultLayout = LayoutRecord()
    ;[
      'width',
      'height',
      'minWidth',
      'maxWidth',
      'minHeight',
      'maxHeight',
      'justifyContent',
      'alignItems',
      'alignSelf',
      'alignContent',
      'flexGrow',
      'flexShrink',
      'positionType',
      'aspectRatio',
      'flexWrap',
      'flexDirection'
    ].forEach((key) => {
      try {
        const propKey = (props as any)[key]
        const value = propKey ?? (defaultLayout as any)[key]
        ;(node as any)[`set${key[0].toUpperCase()}${key.slice(1, key.length)}`](value)
      } catch (e) {
        console.log(e)
      }
    })

    if (props.position) {
      node.setPositionType(props.position)
    }

    if (props.positionTop) {
      node.setPosition(Yoga.EDGE_TOP, props.positionTop)
    }

    node.setDisplay(Yoga.DISPLAY_FLEX)
    const children = React.Children.toArray(props.children)
    children
      .map((children) => createYogaNodes((children as any).props))
      .forEach((children, index) => node.insertChild(children, index))
    return node
  }

  function getComputedLayout(node: Yoga.YogaNode): ComputedLayout {
    console.log({ childCount: node.getChildCount() })
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
    root.calculateLayout(props.width, props.height, props.direction)
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
        {props.span}
      </div>
      {(children || []).map((children, index) => (
        <YogaJsx key={index} computedLayout={children} span={index.toString()} {...getChildProps(index)} />
      ))}
    </div>
  )
}

export const Pepe = 1

export default YogaJsx
