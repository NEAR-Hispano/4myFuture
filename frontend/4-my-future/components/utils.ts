
export const ONE_NEAR_IN_YOCTO = 1000000000000000000000000;

export const NANOSEC_DIA = 86400000000000;

export function toDay_from_nano(start: string, end: string): string {
    return ((parseInt(end) - parseInt(start)) / NANOSEC_DIA).toFixed();
}

export function toNEAR(value: string): string {
    return (parseFloat(value) / ONE_NEAR_IN_YOCTO).toFixed(2);
}

export function toYocto(value: string): string {
    return (parseFloat(value) * ONE_NEAR_IN_YOCTO).toFixed();
}