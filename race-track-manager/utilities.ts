export const getFullDate = (time: string): Date => 
    new Date(`${new Date().toLocaleDateString('en-US')} ${time}`)

export const addHoursToDate = (inputDate: Date, hours: number): Date => {
    const outputDate = inputDate;
    outputDate.setHours(inputDate.getHours() + (hours || 0));
    return outputDate;
};

export const getDateDifferenceInMinutes = (startDate: Date, endDate: Date): number => 
    ((endDate.getTime() - startDate.getTime())/60000) 