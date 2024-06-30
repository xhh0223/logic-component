export type Id = string | number

export type IdsEntries<Params> = Array<Readonly<[Id, Params?]>>
