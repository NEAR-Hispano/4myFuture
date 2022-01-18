import Contribution from './Contribution';

export default interface User {
    username: string;
    contributions: Contribution[];
    withActiveProposal: boolean;
    rank: number;
}