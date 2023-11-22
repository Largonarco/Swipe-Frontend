import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
	name: "invoices",
	initialState: [],
	reducers: {
		addInvoice: (state, action) => {
			return [...state, action.payload];
		},
		deleteInvoice: (state, action) => {
			return state.filter((invoice) => invoice.id !== action.payload);
		},
		updateInvoice: (state, action) => {
			return state.map((invoice) =>
				invoice.id === parseInt(action.payload.id) ? action.payload.updatedInvoice : invoice
			);
		},
		updateInvoices: (state, action) => {
			action.payload.editedInvoices.forEach((editedInvoice) => {
				const index = state.findIndex((invoice) => invoice.id === editedInvoice.id);

				state[index] = editedInvoice;
			});
		},
	},
});

export default invoicesSlice.reducer;

export const selectInvoiceList = (state) => state.invoices;

export const { addInvoice, deleteInvoice, updateInvoice, updateInvoices } = invoicesSlice.actions;
