import { useState } from "react";
import {
  ShoppingBag,
  Phone,
  User,
  Calendar,
  Search,
  Trash2,
  CheckCircle2,
  CreditCard,
  Truck,
  Mail,
  MapPin,
  Lock,
} from "lucide-react";
import { useOrders, updateOrderStatus, deleteOrder, type CustomerOrder } from "@/lib/db";

const ORDER_STATUSES: CustomerOrder["status"][] = [
  "Confirmed",
  "Processing",
  "Dispatched",
  "Delivered",
];

const STATUS_STYLES: Record<CustomerOrder["status"], string> = {
  Confirmed: "border-sky-500/50 bg-sky-950/40 text-sky-300",
  Processing: "border-amber-500/50 bg-amber-950/40 text-amber-300",
  Dispatched: "border-purple-500/50 bg-purple-950/40 text-purple-300",
  Delivered: "border-emerald-500/50 bg-emerald-950/40 text-emerald-300",
};

export function OrdersList() {
  const orders = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedPayment, setSelectedPayment] = useState<string>("ALL");

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchesCustomer =
      o.customerName.toLowerCase().includes(q) ||
      o.contactNumber.includes(q) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
      (o.paymentId && o.paymentId.toLowerCase().includes(q)) ||
      o.id.toLowerCase().includes(q);
    const matchesItems = o.items.some((item) => item.name.toLowerCase().includes(q));
    const matchesStatus = selectedStatus === "ALL" || o.status === selectedStatus;
    const matchesPayment =
      selectedPayment === "ALL" ||
      (selectedPayment === "Razorpay" && o.paymentMethod === "Razorpay") ||
      (selectedPayment === "COD" && o.paymentMethod === "Cash on Delivery");

    return (matchesCustomer || matchesItems) && matchesStatus && matchesPayment;
  });

  const handleStatusChange = (orderId: string, newStatus: CustomerOrder["status"]) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to remove order "${orderId}"?`)) {
      deleteOrder(orderId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, phone, Razorpay ID, or Order ID..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-white focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
          >
            <option value="ALL">All Order Statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
          >
            <option value="ALL">All Payments</option>
            <option value="Razorpay">Razorpay Live</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
            <span>Total Orders:</span>
            <strong className="text-white bg-zinc-900 px-2 py-0.5 border border-zinc-800">
              {orders.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-400" />
            <h2 className="font-display text-sm uppercase tracking-widest text-white font-bold">
              Customer Orders ({filteredOrders.length})
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase bg-zinc-900 text-emerald-400 border border-emerald-500/30 px-2 py-0.5">
            Razorpay Live Active
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            No customer orders found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-zinc-900/30 transition-colors">
                {/* Order Header: ID, Date, Status & Total */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-900">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-white px-2.5 py-1 bg-zinc-900 border border-zinc-800">
                      {order.id}
                    </span>

                    {/* Payment Badge */}
                    {order.paymentMethod === "Cash on Delivery" ? (
                      <span className="text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 border border-amber-800/80 px-2 py-0.5 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-amber-400" /> COD (Pending)
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-emerald-400" /> Razorpay Paid
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 hidden xs:inline">
                        Status:
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as CustomerOrder["status"])
                        }
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 border transition-colors cursor-pointer bg-zinc-950 focus:outline-none ${
                          STATUS_STYLES[order.status] || "border-zinc-700 text-zinc-300"
                        }`}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st} className="bg-zinc-900 text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="font-mono text-sm font-bold text-white">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>

                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      title="Delete Order"
                      className="p-1.5 text-zinc-500 hover:text-red-400 border border-zinc-800 hover:border-red-800 bg-zinc-900/60 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Customer Information & Payment Details Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-3 bg-zinc-900/40 border-b border-zinc-900 px-4 my-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <User className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="text-zinc-500 uppercase text-[10px]">Customer:</span>
                    <strong className="text-white truncate">{order.customerName}</strong>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="text-zinc-500 uppercase text-[10px]">Contact:</span>
                    <strong className="text-white font-mono">{order.contactNumber}</strong>
                  </div>

                  {order.paymentId ? (
                    <div className="flex items-center gap-2 text-emerald-300 md:col-span-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-zinc-500 uppercase text-[10px]">Payment ID:</span>
                      <strong className="font-mono text-emerald-400 break-all">
                        {order.paymentId}
                      </strong>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Truck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="text-zinc-500 uppercase text-[10px]">Mode:</span>
                      <span className="text-zinc-300">{order.paymentMethod || "Direct"}</span>
                    </div>
                  )}

                  {order.shippingAddress && (
                    <div className="flex items-center gap-2 text-zinc-300 col-span-full pt-1 border-t border-zinc-800/50">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="text-zinc-500 uppercase text-[10px]">Delivery Address:</span>
                      <span className="text-zinc-200">{order.shippingAddress}</span>
                    </div>
                  )}
                </div>

                {/* Order Items View */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Ordered Products ({order.items.length})
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 bg-zinc-900/60 border border-zinc-800/80 p-3 relative"
                      >
                        <div className="w-14 h-16 bg-black border border-zinc-800 shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <p className="font-mono text-xs text-white font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 font-mono mt-1">
                            Size: <span className="text-zinc-200">{item.size}</span> · Qty:{" "}
                            <span className="text-zinc-200">{item.qty}</span> · ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
