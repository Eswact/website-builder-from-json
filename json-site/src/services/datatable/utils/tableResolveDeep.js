import tableSelectedRow from './tableSelectedRow';

const tableResolveDeep = function (data, table, resolvedString) {
    let tableData = tableSelectedRow.selectedRow[table];
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            data[index] = tableResolveDeep(item, table, resolvedString);
        });
    } else if (typeof data === 'object' && data !== null) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = tableResolveDeep(data[key], table, resolvedString);
            }
        }
    } else if (typeof data === 'string') {
      if (data.includes(resolvedString)) {
        if (Array.isArray(tableData)) {
            data = tableData.map(item => item[data.split('.')[1]]);
        }
        else {
            data = tableData[data.split('.')[1]];
        }
      }
    }
    return data;
};

export default tableResolveDeep;