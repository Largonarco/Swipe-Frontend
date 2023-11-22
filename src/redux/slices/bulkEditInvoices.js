import { createSlice } from "@reduxjs/toolkit";

const bulkEditInvoicesSlice = createSlice({
	name: "bulkEditInvoices",
	initialState: [],
	reducers: {
		addBulkEditInvoices: (state, action) => {
			return (state = action.payload.invoiceList.filter((invoice) =>
				action.payload.bulkEditInvoiceIds.includes(invoice.id.toString())
			));
		},
		deleteBulkEditInvoices: (state, action) => {
			return [];
		},
		updateBulkEditInvoice: (state, action) => {
			const state_copy = state;
			const { type, name, value, calcReq, invoiceIndex, invoiceItemIndex } = action.payload;

			if (type === "notEdit") {
				state_copy[invoiceIndex][name] = value;
			} else {
				state_copy[invoiceIndex].items[invoiceItemIndex][name] = value;
			}

			if (calcReq) {
				let subTotal = 0;

				state_copy[invoiceIndex].items.forEach((item) => {
					subTotal += parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
				});

				const discountAmount = parseFloat(subTotal * (state_copy[invoiceIndex].discountRate / 100)).toFixed(2);
				const taxAmount = parseFloat(subTotal * (state_copy[invoiceIndex].taxRate / 100)).toFixed(2);
				const total = (subTotal - parseFloat(discountAmount) + parseFloat(taxAmount)).toFixed(2);

				state_copy[invoiceIndex] = {
					...state_copy[invoiceIndex],
					subTotal: parseFloat(subTotal).toFixed(2),
					discountAmount,
					taxAmount,
					total,
				};
			}

			return state_copy;
		},
	},
});

export default bulkEditInvoicesSlice.reducer;

export const selectBulkEditInvoiceList = (state) => state.bulkEditInvoices;

export const { addBulkEditInvoices, deleteBulkEditInvoices, updateBulkEditInvoice } = bulkEditInvoicesSlice.actions;
