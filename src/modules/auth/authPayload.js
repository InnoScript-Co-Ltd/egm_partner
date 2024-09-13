export const authPayload = {
    personal: {
        username: "",
        first_name: "",
        last_name: "",
        address: "",
        profile: "",
    },
    account: {
        email: "",
        phone: "",
    },
    kyc: {
        nrc: "",
        dob: "",
        nrc_front: "",
        nrc_back: ""
    },
    updatePassword: {
        old_password: "",
        password: "",
        password_confirmation: ""
    },
    paymentPassword: {
        payment_password: ""
    },
    columns: [
        {field: 'account_number', header: 'Account Number'},
        {field: 'account_name', header: 'Account Name'},
        {field: 'bank_type', header: 'Bank Type'},
        {field: 'branch', header: 'Branch'},
        {field: 'branch_address', header: 'Address'}
    ]
}