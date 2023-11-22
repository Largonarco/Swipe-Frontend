import { useSelector } from "react-redux";
import { selectInvoiceList } from "../slices/invoices";
import { selectBulkEditInvoiceList } from "../slices/bulkEditInvoices";
import { useEffect } from "react";

export const useInvoiceListData = () => {
	const invoiceList = useSelector(selectInvoiceList);

	const listSize = invoiceList.length;

	const getOneInvoice = (receivedId) => {
		return invoiceList.find((invoice) => invoice.id.toString() === receivedId.toString()) || null;
	};

	return {
		listSize,
		invoiceList,
		getOneInvoice,
	};
};

export const useBulkEditInvoicesListData = () => {
	const bulkEditInvoiceList = useSelector(selectBulkEditInvoiceList);

	const listSize = bulkEditInvoiceList.length;

	return {
		listSize,
		bulkEditInvoiceList,
	};
};
