import { useScreen_max1200 } from '@src/hooks/media'
import { Anchor } from 'antd'
import classNames from 'classnames'
import { useEventBus } from 'react-logic-component'

export const SideAnchor: React.FC<{ anchors: any[] }> = (props) => {
  const { anchors } = props
  const isShowAnchor = useScreen_max1200()
  const eventBus = useEventBus()
  return (
    <div className={classNames(!isShowAnchor && 'is-hidden', 'anchor-container')}>
      <Anchor
        onClick={(_, linkInfo) => {
          eventBus.emit(
            anchors?.map((i) => ({
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
