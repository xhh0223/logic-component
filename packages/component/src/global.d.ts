export module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  declare function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null
}
