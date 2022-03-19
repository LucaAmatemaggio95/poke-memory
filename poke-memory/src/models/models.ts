export interface Pokemon {
    name: string,
    showing: boolean,
    found: boolean,
    image: string,
    order_num: number
}

export interface Choice {
    previous?: string | null,
    current?: string | null
};