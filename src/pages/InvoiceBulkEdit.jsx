import { BiArrowBack } from "react-icons/bi";
import { Button, Card, Form, Table, InputGroup } from "react-bootstrap";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { updateInvoices } from "../redux/slices/invoices";
import { useInvoiceListData, useBulkEditInvoicesListData } from "../redux/hooks";
import { addBulkEditInvoices, deleteBulkEditInvoices, updateBulkEditInvoice } from "../redux/slices/bulkEditInvoices";

const InvoiceBulkEdit = () => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const { invoiceList } = useInvoiceListData();
	const { bulkEditInvoiceList } = useBulkEditInvoicesListData();
	const bulkEditInvoiceIds = searchParams.get("ids").slice(0, -1).split(",");

	useEffect(() => {
		dispatch(addBulkEditInvoices({ invoiceList, bulkEditInvoiceIds }));

		return () => {
			dispatch(deleteBulkEditInvoices());
		};
	}, []);

	console.log(bulkEditInvoiceList);

	const editField = (e, invoiceIndex, calcReq = false, type = "notEdit", invoiceItemIndex = 0) => {
		dispatch(
			updateBulkEditInvoice({
				type,
				calcReq,
				invoiceIndex,
				invoiceItemIndex,
				name: e.target.name,
				value: e.target.value,
			})
		);
	};

	const submitEditedInvoices = (e) => {
		e.preventDefault();

		if (e.currentTarget.checkValidity === false) {
			alert("Make sure no required field is empty");
		} else {
			dispatch(updateInvoices({ editedInvoices: bulkEditInvoiceList }));
			alert("Invoices edited succesfully");
		}
	};

	return (
		<Form onSubmit={submitEditedInvoices}>
			<div className="d-flex align-items-center">
				<BiArrowBack size={18} />
				<div className="fw-bold mt-1 mx-2 cursor-pointer">
					<Link to="/">
						<h5>Go Back</h5>
					</Link>
				</div>
			</div>

			<Card className="p-3 p-xl-4 my-3 my-xl-4">
				<div className="d-flex flex-row align-items-center justify-content-between">
					<h3 className="fw-bold pb-2 pb-md-4">Bulk Edit Invoices</h3>
				</div>

				<div className="overflow-scroll w-100">
					<Table style={{ tableLayout: "fixed", width: "2400px" }}>
						<thead>
							<tr>
								<th colSpan="2" style={{ border: "1px solid #0000001a" }}>
									Billing Dates
								</th>
								<th colSpan="3" style={{ border: "1px solid #0000001a" }}>
									Bill To
								</th>
								<th colSpan="3" style={{ border: "1px solid #0000001a" }}>
									Bill From
								</th>
								<th colSpan="4" style={{ border: "1px solid #0000001a" }}>
									Item
								</th>
								<th colSpan="2" style={{ border: "1px solid #0000001a" }}>
									Tax And Discount
								</th>
								<th colSpan="1" style={{ border: "1px solid #0000001a" }}>
									Notes
								</th>
							</tr>
							<tr>
								<th style={{ border: "1px solid #0000001a" }}>Issue date</th>
								<th style={{ border: "1px solid #0000001a" }}>Due date</th>
								<th style={{ border: "1px solid #0000001a" }}>Invoice to</th>
								<th style={{ border: "1px solid #0000001a" }}>Email</th>
								<th style={{ border: "1px solid #0000001a" }}>Address</th>
								<th style={{ border: "1px solid #0000001a" }}>Invoice from</th>
								<th style={{ border: "1px solid #0000001a" }}>Email</th>
								<th style={{ border: "1px solid #0000001a" }}>Address</th>
								<th style={{ border: "1px solid #0000001a" }}>Name</th>
								<th style={{ border: "1px solid #0000001a" }}>Description</th>
								<th style={{ border: "1px solid #0000001a" }}>Quantity</th>
								<th style={{ border: "1px solid #0000001a" }}>Price / Rate</th>
								<th style={{ border: "1px solid #0000001a" }}>Tax</th>
								<th style={{ border: "1px solid #0000001a" }}>Discount</th>
								<th style={{ border: "1px solid #0000001a" }}></th>
							</tr>
						</thead>
						<tbody>
							{bulkEditInvoiceList?.map((bulkEditInvoice, invoiceIndex) => (
								<tr key={bulkEditInvoice.id}>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											key={bulkEditInvoice.issueDate}
											type="date"
											name="issueDate"
											value={bulkEditInvoice.issueDate}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											key={bulkEditInvoice.dueDate}
											type="date"
											name="dueDate"
											value={bulkEditInvoice.dueDate}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billTo"
											value={bulkEditInvoice.billTo}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billToEmail"
											value={bulkEditInvoice.billToEmail}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billToAddress"
											value={bulkEditInvoice.billToAddress}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billFrom"
											value={bulkEditInvoice.billFrom}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billFromEmail"
											value={bulkEditInvoice.billFromEmail}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											required
											type="text"
											name="billFromAddress"
											value={bulkEditInvoice.billFromAddress}
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>

									<td colSpan="4" style={{ verticalAlign: "top" }}>
										<table>
											<tbody>
												{bulkEditInvoice.items.map((item, invoiceItemIndex) => (
													<tr key={item.itemId}>
														<td>
															<Form.Control
																required
																type="text"
																name="itemName"
																value={item.itemName}
																onChange={(e) => editField(e, invoiceIndex, "isItem", invoiceItemIndex)}
															/>
														</td>
														<td>
															<Form.Control
																required
																type="text"
																name="itemDescription"
																value={item.itemDescription}
																onChange={(e) => editField(e, invoiceIndex, "isItem", invoiceItemIndex)}
															/>
														</td>
														<td>
															<Form.Control
																required
																type="number"
																name="itemQuantity"
																value={item.itemQuantity}
																onChange={(e) => editField(e, invoiceIndex, true, "isItem", invoiceItemIndex)}
															/>
														</td>
														<td>
															<Form.Control
																min={1}
																type="number"
																step="0.01"
																presicion={2}
																name="itemPrice"
																id={item.itemId}
																value={item.itemPrice}
																onChange={(e) => editField(e, invoiceIndex, true, "isItem", invoiceItemIndex)}
															/>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</td>

									<td style={{ verticalAlign: "top" }}>
										<InputGroup className="flex-nowrap">
											<Form.Control
												min="0.00"
												step="0.01"
												max="100.00"
												type="number"
												name="taxRate"
												placeholder="0.0"
												value={bulkEditInvoice.taxRate}
												onChange={(e) => editField(e, invoiceIndex, true)}
											/>
											<InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
										</InputGroup>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<InputGroup className="flex-nowrap">
											<Form.Control
												min="0.00"
												step="0.01"
												max="100.00"
												type="number"
												name="discountRate"
												placeholder="0.0"
												value={bulkEditInvoice.discountRate}
												onChange={(e) => editField(e, invoiceIndex, true)}
											/>
											<InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
										</InputGroup>
									</td>
									<td style={{ verticalAlign: "top" }}>
										<Form.Control
											rows={1}
											name="notes"
											as="textarea"
											value={bulkEditInvoice.notes}
											placeholder="Thanks for your business!"
											onChange={(e) => editField(e, invoiceIndex)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>

				<Button variant="primary w-25 align-self-end" type="submit">
					Edit Invoices
				</Button>
			</Card>
		</Form>
	);
};

export default InvoiceBulkEdit;
