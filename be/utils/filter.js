let relative = (filterObject, filterArray) => {
    // Trả về mảng các phần tử trong filterArray có key trùng với filterObject
    // trong đó value của filterArray chứa value của filterObject
    let filter = Object.entries(filterObject);
    filter.forEach(([filterKey, filterValue]) => {
        filterArray = filterArray.filter((item) => {
            let value = new String(item[filterKey])
                .normalize(`NFD`)
                .replace(/[\u0300-\u036f]/g, ``)
                .toLocaleLowerCase();
            let compare = new String(filterValue)
                .normalize(`NFD`)
                .replace(/[\u0300-\u036f]/g, ``)
                .toLocaleLowerCase();
            return value.includes(compare);
        });
    });
    return filterArray;
};

let keyword = (keyword, filterArray) => {
    // Trả về mảng các phần tử trong filterArray chứa keyword trong bất cứ value nào
    filterArray = filterArray.filter((item) => {
        let check = false;
        for (let i in item) {
            let value = new String(item[i])
                .normalize(`NFD`)
                .replace(/[\u0300-\u036f]/g, ``)
                .toLocaleLowerCase();
            let compare = new String(keyword)
                .normalize(`NFD`)
                .replace(/[\u0300-\u036f]/g, ``)
                .toLocaleLowerCase();
            if (value.includes(compare)) check = true;
        }
        return check;
    });
    return filterArray;
};

let dates = (startDate, endDate, filterArray, dateField) => {
    // Trả về mảng các phần từ của filterArray có value của dateField
    // nằm trong khoảng thời gian từ startDate đến endDate
    filterArray = filterArray.filter((item) => {
        return (
            new Date(item[dateField]) - new Date(startDate) >= 0 &&
            new Date(item[dateField]) - new Date(endDate) <= 0
        );
    });
    return filterArray;
};

module.exports = { keyword, relative, dates };
