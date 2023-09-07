export interface TreeNode {
  id: string,
  parentId: string,
  value: any
  children?: TreeNode[]
}
export function genTreeData(...args: number[]) {
  let tempArgs = args.slice(1, args.length)
  let result: string[] = []
  Array.from({ length: args[0] }).forEach((_, index) => {
    result.push(`${index}`)
  })

  let lastResult = [...result]
  while (tempArgs.length) {
    const temp = tempArgs.shift()
    const tempLastResult: string[] = []
    for (let item of lastResult) {
      Array.from({ length: temp! }).forEach((_, index) => {
        result.push(`${item}-${index}`)
        tempLastResult.push(`${item}-${index}`)
      })
    }
    lastResult = tempLastResult
  }

  const listTree = result.map(item => ({
    id: item,
    parentId: item.split("-").slice(0, -1).join("-"),
    value: item,
  }))

  const listTreeMap: Record<string, TreeNode> = {}
  listTree.forEach(item => {
    listTreeMap[item.id] = item
  })

  const tree: TreeNode[] = []
  for (let node of listTree) {
    if (listTreeMap[node.parentId]) {
      if (listTreeMap[node.parentId].children) {
        listTreeMap[node.parentId].children?.push(listTreeMap[node.id])
      } else {
        listTreeMap[node.parentId].children = [listTreeMap[node.id]]
      }
    } else {
      listTreeMap[node.id].parentId = "root"
      tree.push(listTreeMap[node.id])
    }
  }
  return tree
}
