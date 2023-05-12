export const Fields = [
    'Transaction_Date',
    'Month_Year',
    'Transaction_Type',
    'From_Account',
    'To_Account',
    'Amount',
    'Receipt',
    'Notes',
];

const newDate = new Date();

const MonthYear = [
    'January ' + newDate.getFullYear(),
    'February ' + newDate.getFullYear(),
    'March ' + newDate.getFullYear(),
    'April ' + newDate.getFullYear(),
    'May ' + newDate.getFullYear(),
    'June ' + newDate.getFullYear(),
    'July ' + newDate.getFullYear(),
    'August ' + newDate.getFullYear(),
    'September ' + newDate.getFullYear(),
    'October ' + newDate.getFullYear(),
    'November ' + newDate.getFullYear(),
    'December ' + newDate.getFullYear()
];


export const MonthData = []

for (let i = 0; i < newDate.getMonth() + 1; i++) {
    MonthData.push(MonthYear[i])
}

export const TransactionType = ['Home Expense',
    'Personal Expense',
    'Income',]


export const FromAccount = ['Personal Account',
    'Real Living',
    'My Dream Home',
    'Full Circle',
    'Core Realtors',
    'Big Block',]

export const maxCharNotes = 250;
export const MaxFileSize = 1;
export const SupportedFileType = ['image/png', 'image/jpg', "image/jpeg"];
export const MinAmount = 0;
export const MaxAmount = 100000;
export const MinDate = '2000-01-01';


export const getBase64 = (file) => {
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document = reader.result;
    };
    return document
}


export const dataSort = (list, key, sortType) => {
    return list.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (sortType === 'asc') {
            if (key === 'Transaction_Date') {
                return new Date(x) - new Date(y);
            }
            if (key === 'Month_Year') {
                return MonthYear.indexOf(x) - MonthYear.indexOf(y);
            }
            if (key === 'Amount') {
                x = Number(x.replaceAll(',', ''));
                y = Number(y.replaceAll(',', ''));
                return x < y ? -1 : x > y ? 1 : 0;
            }
            return x < y ? -1 : x > y ? 1 : 0;
        } else {
            if (key === 'Transaction_Date') {
                return new Date(y) - new Date(x);
            }
            if (key === 'Month_Year') {
                return MonthYear.indexOf(y) - MonthYear.indexOf(x);
            }
            if (key === 'Amount') {
                x = Number(x.replaceAll(',', ''));
                y = Number(y.replaceAll(',', ''));
                return x > y ? -1 : x < y ? 1 : 0;
            }
            return x > y ? -1 : x < y ? 1 : 0;
        }
    });
}