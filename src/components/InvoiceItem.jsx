import { BiTrash } from "react-icons/bi";
import { Table, Button } from "react-bootstrap";

import EditableField from "./EditableField";

const InvoiceItem = ({ items, currency, onRowDel, onRowAdd, onItemizedItemEdit }) => {
	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>ITEM</th>
						<th>QTY</th>
						<th>PRICE/RATE</th>
						<th className="text-center">ACTION</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<ItemRow
							key={item.itemId}
							item={item}
							currency={currency}
							onDelEvent={onRowDel}
							onItemizedItemEdit={onItemizedItemEdit}
						/>
					))}
				</tbody>
			</Table>
			<Button className="fw-bold" onClick={onRowAdd}>
				Add Item
			</Button>
		</div>
	);
};

const ItemRow = ({ item, currency, onDelEvent, onItemizedItemEdit }) => {
	return (
		<tr>
			<td style={{ width: "100%" }}>
				<EditableField
					onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
					cellData={{
						type: "text",
						name: "itemName",
						placeholder: "Item name",
						value: item.itemName,
						id: item.itemId,
					}}
				/>
				<EditableField
					onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
					cellData={{
						type: "text",
						name: "itemDescription",
						placeholder: "Item description",
						value: item.itemDescription,
						id: item.itemId,
					}}
				/>
			</td>
			<td style={{ minWidth: "70px" }}>
				<EditableField
					onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
					cellData={{
						type: "number",
						name: "itemQuantity",
						min: 1,
						step: "1",
						value: item.itemQuantity,
						id: item.itemId,
					}}
				/>
			</td>
			<td style={{ minWidth: "130px" }}>
				<EditableField
					onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
					cellData={{
						leading: currency,
						type: "number",
						name: "itemPrice",
						min: 1,
						step: "0.01",
						presicion: 2,
						textAlign: "text-end",
						value: item.itemPrice,
						id: item.itemId,
					}}
				/>
			</td>
			<td className="text-center" style={{ minWidth: "50px" }}>
				<BiTrash
					onClick={() => onDelEvent(item)}
					className="text-white mt-1 btn btn-danger"
					style={{ height: "33px", width: "33px", padding: "7.5px" }}
				/>
			</td>
		</tr>
	);
};

export default InvoiceItem;
