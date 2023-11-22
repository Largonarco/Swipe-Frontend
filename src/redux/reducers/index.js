import invoicesReducer from "../slices/invoices";
import { combineReducers } from "@reduxjs/toolkit";
import bulkEditInvoicesReducer from "../slices/bulkEditInvoices";

const rootReducer = combineReducers({
	invoices: invoicesReducer,
	bulkEditInvoices: bulkEditInvoicesReducer,
});

export default rootReducer;
