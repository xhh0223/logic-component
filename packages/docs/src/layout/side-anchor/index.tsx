import { useScreen_max1200 } from '@src/hooks/media'
import { Anchor } from 'antd'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useEventBus } from 'react-logic-component'

const flattenAnchor = (anchor, result) => {
  anchor.forEach((i) => {
    result.push(i)
    if (i.children) {
      flattenAnchor(i.children, result)
    }
  })
  return result
}

export const SideAnchor: React.FC<{ anchors: any[] }> = (props) => {
  const { anchors } = props
  const isShowAnchor = useScreen_max1200()
  const eventBus = useEventBus()
  const anchorList = useMemo(() => flattenAnchor(anchors, []), [anchors])
  return (
    <div className={classNames(!isShowAnchor && 'is-hidden', 'anchor-container')}>
      <Anchor
        onClick={(_, linkInfo) => {
          eventBus.emit(
            anchorList?.map((i) => ({
              id: i.key,
              params: { isActive: linkInfo.href === i.href },
            })),
          )
        }}
        items={anchors}
      />
    </div>
  )
}
