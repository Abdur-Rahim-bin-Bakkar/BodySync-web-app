import { getTransactions } from "@/lib/api/getTransactions";

export default async function TransactionsPage() {
  const result = await getTransactions();
  const transactions = result?.data || [];

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

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-base-200 rounded-2xl border border-base-300 p-6 text-center">
          <div className="text-6xl mb-4">💳</div>
          <h2 className="text-2xl font-bold mb-2">
            No Transactions Yet
          </h2>
          <p className="text-gray-500 max-w-md">
            Payment history will appear here once users complete their Stripe checkout.
          </p>
        </div>
      ) : (
        /* TABLE WRAPPER */
        <div className="w-full overflow-x-auto rounded-2xl border border-base-300 bg-base-200 shadow-sm">
          
          {/* MOBILE CARD VIEW (sm only) */}
          <div className="md:hidden space-y-3 p-3">
            {transactions.map((t, index) => (
              <div
                key={t._id}
                className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">#{index + 1}</span>
                  <span className="badge badge-success text-xs">
                    ${(t.amount || 0) / 100}
                  </span>
                </div>

                <p className="text-sm font-medium break-all">
                  {t.userEmail || "N/A"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>

                <p className="text-[11px] font-mono text-gray-600 mt-2 break-all">
                  {t.transactionId}
                </p>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block">
            <table className="table w-full table-fixed">
              {/* HEAD */}
              <thead className="bg-base-300 text-base-content">
                <tr className="text-sm uppercase tracking-wide">
                  <th className="w-[60px] text-center">#</th>
                  <th className="w-[240px] text-left">User Email</th>
                  <th className="w-[120px] text-center">Amount</th>
                  <th className="w-[200px] text-center">Date</th>
                  <th className="text-left">Transaction ID</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {transactions.map((t, index) => (
                  <tr
                    key={t._id}
                    className="hover:bg-base-300 transition border-b border-base-300"
                  >
                    <td className="text-center font-medium">
                      {index + 1}
                    </td>

                    <td className="truncate font-medium">
                      {t.userEmail}
                    </td>

                    <td className="text-center">
                      <span className="inline-flex px-3 py-1 rounded-full bg-success/20 text-success font-semibold text-sm">
                        ${(t.amount || 0) / 100}
                      </span>
                    </td>

                    <td className="text-center text-sm text-gray-500">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>

                    <td className="font-mono text-xs text-gray-600 break-all">
                      {t.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}