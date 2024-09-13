export const depositPayloaad = {
    createTransaction: {
        merchant_account_id: '',
        package_id: '',
        transaction_screenshoot: '',
        package_deposit_amount: '',
        sender_account_id: "",
        bank_type: "",
    },
    update: {
        partner_id: "",
        account_name: "",
        account_number: "",
        bank_type: "",
        bank_type_label: "",
        branch: "",
        branch_address: "",
        status: ""
    },
    columns: [
        { field: 'account_number', header: 'Account Number' },
        { field: 'account_name', header: 'Account Name' },
        { field: 'bank_type', header: 'Bank Type' },
        { field: 'branch', header: 'Branch' },
        { field: 'branch_address', header: 'Address' }
    ]
}