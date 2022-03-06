
export default interface Proposal {
    user: string,
    amountNeeded:string,
    founds: string,
    title: string,
    goal: string,
    linkInstitution: string,
    linkPensum: string,
    activityStart: string,
    activityEnd: string,
    description: string,
    initDate: string,
    finishDate: string,
    photos: string[],
    status: number,
    index: number
}
