
export default interface Proposal {
    user: string,
    amountNeeded:string,
    founds: string,
    title: string,
    description: string,
    initDate: string,
    finishDate: string,
    photos: string[],
    status: number,
    index: number
}
