export const first = <Arr extends []>(arr: Arr) => Reflect.get(arr, 0)
export const last = <Arr extends []>(arr: Arr) => Reflect.get(arr, arr.length - 1) 