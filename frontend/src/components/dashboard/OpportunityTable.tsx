const opportunities = [
  {
    title: "PMEGP Loan Scheme",
    category: "Government",
    deadline: "31 Aug 2026",
    status: "Open",
  },
  {
    title: "Bihar Startup Seed Fund",
    category: "Startup",
    deadline: "15 Sep 2026",
    status: "Open",
  },
  {
    title: "AI Internship Program",
    category: "Private",
    deadline: "05 Aug 2026",
    status: "Closing Soon",
  },
  {
    title: "Skill Development Grant",
    category: "Education",
    deadline: "20 Sep 2026",
    status: "Open",
  },
];

export default function OpportunityTable() {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Latest Opportunities
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="p-4 text-left">
              Opportunity
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Deadline
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {opportunities.map((item, index) => (

            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">
                {item.title}
              </td>

              <td className="p-4">
                {item.category}
              </td>

              <td className="p-4">
                {item.deadline}
              </td>

              <td className="p-4">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}