export const addHours = (time, hours) => {
    return new Date(new Date(time).getTime() - hours * 60 * 60 * 1000).toISOString();
}