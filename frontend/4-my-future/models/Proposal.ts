
export default interface Proposal {
    user: string,
    amount_needed:string,
    funds: string,
    title: string,
    goal: string,
    link_institution: string,
    link_pensum: string,
    activityStart: string,
    activityEnd: string,
    description: string,
    init_date: string,
    finish_date: string,
    pics: string[],
    status: number,
    index: number
    is_reclaimable: boolean
}
