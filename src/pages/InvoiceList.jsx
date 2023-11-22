import { BsEyeFill } from "react-icons/bs";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { Button, Card, Col, Row, Table } from "react-bootstrap";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import InvoiceModal from "../components/InvoiceModal";
import { deleteInvoice } from "../redux/slices/invoices";

const InvoiceList = () => {
	const navigate = useNavigate();
	const [copyId, setCopyId] = useState("");
	const { invoiceList, getOneInvoice } = useInvoiceListData();
	const [isBulkEditActive, setIsBulkEditActive] = useState(false);
	const [bulkEditInvoiceIds, setBulkEditInvoiceIds] = useState("");

	const isListEmpty = invoiceList.length === 0;

	const handleCreateInvoice = () => {
		navigate("create");
	};

	const handleBulkEditInvoices = () => {
		const bulkEditChecks = document.querySelectorAll(".bulkEditCheck");
		const bulkEditCheckHeader = document.getElementById("bulkEditCheckHeader");

		if (isBulkEditActive) {
			bulkEditCheckHeader.style.display = "none";
			bulkEditChecks.forEach((bulkEditCheck) => {
				bulkEditCheck.style.display = "none";
			});
		} else {
			bulkEditCheckHeader.style.display = "table-cell";
			bulkEditChecks.forEach((bulkEditCheck) => {
				bulkEditCheck.style.display = "table-cell";
			});
		}

		setIsBulkEditActive(!isBulkEditActive);
	};

	const handleCopyInvoice = () => {
		const invoice = getOneInvoice(copyId);

		if (!invoice) {
			alert("Please enter the valid invoice id.");
		} else {
			navigate(`/create/${copyId}`);
		}
	};

	const confirmBulkEditInvoices = () => {
		if (bulkEditInvoiceIds.length > 3) {
			navigate(`/bulkEdit?ids=${bulkEditInvoiceIds}`);
		} else {
			alert("Please select atleast two invoices");
		}
	};

	return (
		<Row>
			<Col className="mx-auto" xs={12} md={8} lg={9}>
				<h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>

				<Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
					{isListEmpty ? (
						<div className="d-flex flex-column align-items-center">
							<h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>

							<Button variant="primary" onClick={handleCreateInvoice}>
								Create Invoice
							</Button>
						</div>
					) : (
						<div className="d-flex flex-column">
							<div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between">
								<h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>

								<div className="d-flex flex-column flex-lg-row align-items-lg-center">
									<Button variant="primary me-2 me-lg-4 mb-2 mb-lg-4" onClick={handleCreateInvoice}>
										Create Invoice
									</Button>

									<Button variant="primary me-2 me-lg-4 mb-2 mb-lg-4" onClick={handleBulkEditInvoices}>
										Bulk Edit
									</Button>

									<div className="d-flex justify-content-between mb-2 mb-lg-4">
										<Button variant="dark me-1 me-md-2 " onClick={handleCopyInvoice}>
											Copy Invoice
										</Button>

										<input
											type="text"
											value={copyId}
											onChange={(e) => setCopyId(e.target.value)}
											placeholder="Enter Invoice ID to copy"
											className="bg-white border"
										/>
									</div>
								</div>
							</div>

							<Table responsive>
								<thead>
									<tr>
										<th style={{ display: "none", border: "1px solid #0000001a" }} id="bulkEditCheckHeader"></th>
										<th style={{ border: "1px solid #0000001a" }}>Invoice No.</th>
										<th style={{ border: "1px solid #0000001a" }}>Bill To</th>
										<th style={{ border: "1px solid #0000001a" }}>Due Date</th>
										<th style={{ border: "1px solid #0000001a" }}>Total Amt.</th>
										<th style={{ border: "1px solid #0000001a" }}>Actions</th>
									</tr>
								</thead>
								<tbody>
									{invoiceList.map((invoice) => (
										<InvoiceRow
											key={invoice.id}
											invoice={invoice}
											navigate={navigate}
											setBulkEditInvoiceIds={setBulkEditInvoiceIds}
										/>
									))}
								</tbody>
							</Table>

							{isBulkEditActive ? (
								<Button variant="primary w-25 align-self-end" onClick={confirmBulkEditInvoices}>
									Confirm selection
								</Button>
							) : null}
						</div>
					)}
				</Card>
			</Col>
		</Row>
	);
};

const InvoiceRow = ({ invoice, navigate, setBulkEditInvoiceIds }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const handleBulkEditCheck = (e, invoiceId) => {
		if (e.target.checked) {
			setBulkEditInvoiceIds((bulkEditInvoiceIds) => bulkEditInvoiceIds + `${invoice.id},`);
		} else {
			setBulkEditInvoiceIds((bulkEditInvoiceIds) => bulkEditInvoiceIds.replace(`${invoiceId},`, ""));
		}
	};

	const handleEditInvoice = () => {
		navigate(`/edit/${invoice.id}`);
	};

	const handleDeleteInvoice = () => {
		dispatch(deleteInvoice(invoice.id));
	};

	const openInvoiceModal = (event) => {
		event.preventDefault();

		setIsOpen(true);
	};

	const closeInvoiceModal = () => {
		setIsOpen(false);
	};

	return (
		<tr>
			<td style={{ display: "none" }} className="bulkEditCheck fw-normal">
				<input type="checkbox" className="m-0" onClick={(e) => handleBulkEditCheck(e, invoice.id)} />
			</td>
			<td>{invoice.invoiceNumber}</td>
			<td className="fw-normal">{invoice.billTo}</td>
			<td className="fw-normal text-nowrap">{invoice.dueDate}</td>
			<td className="fw-normal">
				{invoice.currency}
				{invoice.total}
			</td>
			<td style={{ width: "15%" }}>
				<div className="d-flex align-items-center justify-content-between">
					<Button className="me-2 me-lg-4" variant="outline-primary" onClick={handleEditInvoice}>
						<BiSolidPencil />
					</Button>

					<Button className="me-2 me-lg-4" variant="danger" onClick={handleDeleteInvoice}>
						<BiTrash />
					</Button>

					<Button className="me-2" variant="secondary" onClick={openInvoiceModal}>
						<BsEyeFill />
					</Button>

					<InvoiceModal
						showModal={isOpen}
						closeModal={closeInvoiceModal}
						info={{
							isOpen,
							id: invoice.id,
							currency: invoice.currency,
							issueDate: invoice.issueDate,
							invoiceNumber: invoice.invoiceNumber,
							dueDate: invoice.dueDate,
							billTo: invoice.billTo,
							billToEmail: invoice.billToEmail,
							billToAddress: invoice.billToAddress,
							billFrom: invoice.billFrom,
							billFromEmail: invoice.billFromEmail,
							billFromAddress: invoice.billFromAddress,
							notes: invoice.notes,
							total: invoice.total,
							subTotal: invoice.subTotal,
							taxRate: invoice.taxRate,
							taxAmount: invoice.taxAmount,
							discountRate: invoice.discountRate,
							discountAmount: invoice.discountAmount,
						}}
						items={invoice.items}
						currency={invoice.currency}
						subTotal={invoice.subTotal}
						taxAmount={invoice.taxAmount}
						discountAmount={invoice.discountAmount}
						total={invoice.total}
					/>
				</div>
			</td>
		</tr>
	);
};

export default InvoiceList;
