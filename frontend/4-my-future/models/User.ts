import Contribution from './Contribution';

export default interface User {
    id: string;
    contributions: Contribution[];
    withActiveProposal: boolean;
    rank: number;
}