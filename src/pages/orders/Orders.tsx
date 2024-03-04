import { useEffect, useState } from "react";
import "./orders.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
import axios from "axios";
import { userInfo } from "os";

export interface Order {
  id: number
  customerId: number
  amount: number
  totalAmount: number
  orderStatus: string
  paymentStatus: any
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
  paymentGateway: string
  paymentDetails: any
  createdAt: string
  updatedAt: string
}

export interface BillingAddress {
  street: string
  zip: number
  city: string
  country: string
}

export interface ShippingAddress {
  street: string
  zip: number
  city: string
  country: string
}



 export interface AddressType {
  street: string
  zip: number
  city: string
  country: string
}


const formatAddress = (billingAddress: AddressType) =>{
  const {street, city, country, zip} = billingAddress;
  return `${street}, ${city}, ${country}, ${zip}. `
}

const columns: GridColDef<Order>[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "amount",
    type: "string",
    headerName: "Amount",
    align: 'center',
    width: 100,
  },
  {
    field: "totalAmount",
    type: "string",
    headerName: "Total Amount",
    align: 'center',
    width: 100,
  },
  
  {
    field: "orderStatus",
    type: "string",
    headerName: "Order Status",
    width: 100,
  },
  {
    field: "paymentStatus",
    type: "string",
    headerName: "Payment Status",
    align: 'center',
    width: 100,
    renderCell: (params) =>  (params.row?.paymentStatus ? params.row?.paymentStatus : '---')
  },
  {
    field: "billingAddress",
    headerName: "Billing Address",
    type: "string",
    width: 200,
    renderCell: (params) =>  formatAddress(params.row?.billingAddress)
  },
  {
    field: "shippingAddress",
    headerName: "Shipping Address",
    type: "string",
    width: 200,
    renderCell: (params) =>  formatAddress(params.row?.shippingAddress)
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
    renderCell: (params) => new Date(params.row?.createdAt).toDateString()
  },
  // {
  //   field: "inStock",
  //   headerName: "In Stock",
  //   width: 150,
  //   type: "boolean",
  // },
];



const Orders = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  const [orders, setOrders] = useState([]);

  const tokenString = localStorage.getItem('user-info');
  const token = JSON.parse(tokenString);
  console.log('token', token);
useEffect(() => {
  // getAllProducts({});
  axios.get('http://localhost:9000/v1/orders/',{
    headers:{
      'Authorization': `Bearer ${token.token}`
    }
  }).then((res) => {
  // axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
    setOrders(res.data.data);
    // setProducts(res.data)
    // setPage(res.data.page)
    console.log('orders', res.data.data);
    // console.log('current page', res.data.page);
  });
}, []);

  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
        <button onClick={() => setOpen(true)}>Add New Orders</button>
      </div>
      <DataTable slug="orders" columns={columns} rows={orders} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="order" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Orders;
