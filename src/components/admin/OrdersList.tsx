import { useState } from "react";
import { ShoppingBag, Phone, User, Calendar, Search } from "lucide-react";
import { useOrders } from "@/lib/db";

export function OrdersList() {
  const orders = useOrders();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchesCustomer =
      o.customerName.toLowerCase().includes(q) ||
      o.contactNumber.includes(q) ||
      o.id.toLowerCase().includes(q);
    const matchesItems = o.items.some((item) => item.name.toLowerCase().includes(q));
    return matchesCustomer || matchesItems;
  });

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
            placeholder="Search orders by customer name, phone number, or ID..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-white focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
          <span>Total Orders:</span>
          <strong className="text-white bg-zinc-900 px-2 py-0.5 border border-zinc-800">
            {orders.length}
          </strong>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-400" />
            <h2 className="font-display text-sm uppercase tracking-widest text-white font-bold">
              Customer Orders
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase text-zinc-500">Live Feed</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            No customer orders found.
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
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/40 text-emerald-300">
                      {order.status}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Customer Information Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 bg-zinc-900/40 border-b border-zinc-900 px-4 my-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-zinc-500 uppercase text-[10px]">Customer:</span>
                    <strong className="text-white">{order.customerName}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-zinc-500 uppercase text-[10px]">Contact No:</span>
                    <strong className="text-white font-mono">{order.contactNumber}</strong>
                  </div>
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
