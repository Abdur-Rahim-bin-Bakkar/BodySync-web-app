export const dynamic = "force-dynamic";
import { getTransactions } from "@/lib/api/getTransactions";
import { getUserById } from "@/lib/api/getUserById";
import Image from "next/image";

export default async function TransactionsPage() {
  const result = await getTransactions();
  const transactions = result?.data || [];

  const users = await Promise.all(
    transactions.map(async (t) => {
      if (!t.userId) return null;

      const res = await getUserById(t.userId);

      return {
        id: t.userId,
        user: res?.data || null,
      };
    })
  );

  const userMap = {};
  users.forEach((u) => {
    if (u?.id) userMap[u.id] = u.user;
  });

  return (
    <div className="min-h-screen w-full bg-base-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">
            Transactions History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            All Stripe payment records in one place
          </p>
        </div>

        <div className="badge badge-primary p-4 text-sm">
          Total: {transactions.length}
        </div>
      </div>

      {/* EMPTY */}
      {transactions.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] bg-base-200 rounded-2xl border">
          No Transactions Yet
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-base-300 bg-base-200 shadow-sm">

          {/* MOBILE VIEW */}
          <div className="md:hidden space-y-3 p-3">
            {transactions.map((t, index) => {
              const user = userMap[t.userId];

              return (
                <div
                  key={t._id}
                  className="bg-base-100 rounded-xl p-4 border hover:shadow-md transition"
                >
                  {/* USER */}
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      width={400}
                      height={300}
                      unoptimized
                      src={user?.image || "https://via.placeholder.com/40"}
                      className="w-10 h-10 rounded-full object-cover border"
                      alt="user"
                    />

                    <div>
                      <p className="font-medium text-sm text-base-content">
                        {user?.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <p className="text-sm font-bold text-success">
                    ${(t.amount || 0) / 100}
                  </p>

                  {/* DATE */}
                  <p className="text-xs text-gray-500 mt-1">
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleString()
                      : "N/A"}
                  </p>

                  {/* TXN ID */}
                  <p className="text-[11px] font-mono break-all mt-2 text-gray-600">
                    {t.transactionId}
                  </p>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">

            <table className="w-full border-collapse">

              {/* HEADER */}
              <thead className="bg-orange-500 text-white sticky top-0 z-10">
                <tr className="text-sm font-semibold">
                  <th className="p-4 text-center w-[60px]">No</th>
                  <th className="p-4 text-left w-[260px]">User</th>
                  <th className="p-4 text-center w-[120px]">Amount</th>
                  <th className="p-4 text-center w-[200px]">Date</th>
                  <th className="p-4 text-left">Transaction ID</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {transactions.map((t, index) => {
                  const user = userMap[t.userId];

                  return (
                    <tr
                      key={t._id}
                      className="
                        border-b
                        border-base-300
                        bg-base-100
                        hover:bg-base-300/40
                        transition-all
                        duration-200
                      "
                    >
                      {/* INDEX */}
                      <td className="p-4 text-center font-medium text-gray-700">
                        {index + 1}
                      </td>

                      {/* USER */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">

                          <Image
                            width={400}
                            height={300}
                            unoptimized
                            src={user?.image || "https://via.placeholder.com/40"}
                            className="w-10 h-10 rounded-full border object-cover"
                            alt="user"
                          />

                          <div className="leading-tight">
                            <p className="font-medium text-base-content">
                              {user?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user?.email || "No email"}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-4 text-center font-semibold text-success">
                        ${(t.amount || 0) / 100}
                      </td>

                      {/* DATE */}
                      <td className="p-4 text-center text-sm text-gray-500">
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleString()
                          : "N/A"}
                      </td>

                      {/* TXN */}
                      <td className="p-4 font-mono text-xs text-gray-600 break-all">
                        {t.transactionId}
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}