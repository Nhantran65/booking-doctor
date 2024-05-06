
export const getFullName = (ele: any): string | null => {
    if(!ele.firstname && ele.lastname) return null;
    return `${ele.firstname} ${ele.lastname}`
} 