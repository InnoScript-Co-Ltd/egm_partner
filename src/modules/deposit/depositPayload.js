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
        { field: 'deposit_amount', header: 'Deposit Amount' },
        { field: 'roi_amount', header: 'Monthly ROI Amount' },
        { field: 'duration', header: 'Duration' },
        { field: 'created_at', header: 'Start Date' },
        { field: 'expired_at', header: 'Expired Date' }
    ]
}