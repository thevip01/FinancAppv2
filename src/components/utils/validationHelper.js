import * as yup from "yup";
import { MaxAmount, MaxFileSize, MinAmount, MinDate, SupportedFileType, maxCharNotes } from './Constant'

export const LoginSchema = yup.object().shape({
    firstName: yup.string()
        .required("Name required")
        .min(3, "Password is too short - should be 3 chars minimum"),
    lastName: yup.string()
        .required("Name required")
        .min(3, "Password is too short - should be 3 chars minimum")
        .notOneOf([yup.ref('firstName')], "First Name And Last Name Can't Be Same"),
    phone: yup.number()
        .required("Phone number required")
        .min(9, 'Phone Number must be 10'),

    email: yup.string()
        .email("Invalid email address format")
        .required("Email is required")
        .min(5, "Too Short!")
        .max(25, "Too Long!"),

    password: yup.string()
        .required("Password is required")
        .min(8, "Password is too short - should be 8 chars minimum")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref('password')], 'Password must be same'),
}).required();

export const AddTransactionSchema = yup.object().shape({
    transactionDate: yup.date()
        .required("Transaction Date required")
        .min(new Date(MinDate), "Date should be valid if greater than " + MinDate)
        .max(new Date(), "Can't select future date"),
    MonthYear: yup.string()
        .required("Month Year required"),
    TransactionType: yup.string()
        .required('Transaction Type is required'),
    FromAccount: yup.string()
        .required('From Account is required'),
    ToAccount: yup.string()
        .required('From Account is required')
        .notOneOf([yup.ref('FromAccount')], "From Account and To Account can't be same"),
    Amount: yup.number()
        .required('Amount is required')
        .min(MinAmount, 'Amount Can\'t be less than ' + MinAmount)
        .max(MaxAmount, 'Amount can\'t be greater than ' + MaxAmount),
    Receipt: yup.mixed()
        .required("Receipt is required")
        .test({
            message: 'Please provide a supported file type',
            test: (file, content) => {
                const isValid = SupportedFileType.includes(String(file[0]?.type));
                return isValid;
            }
        })
        .test({
            message: `max file size is ${MaxFileSize} MB`,
            test: (file, content) => {
                const isValid = (file[0]?.size) < (MaxFileSize * 1000000);
                return isValid;
            }
        }),
    Notes: yup.string()
        .required('Notes required')
        .max(maxCharNotes, `value must be less than ${maxCharNotes} characters`)
}).required();



export const showPassword = {
    1: 'text',
    2: 'password'
}
