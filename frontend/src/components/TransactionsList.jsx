const TransactionsList = ({ transactions }) => {
  console.log(transactions);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th className="text-base font-bold">ID</th>
            <th className="text-base font-bold">Title</th>
            <th className="text-base font-bold">Description</th>
            <th className="text-base font-bold">Price</th>
            <th className="text-base font-bold">Category</th>
            <th className="text-base font-bold">Sold</th>
            <th className="text-base font-bold">Image</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {transactions.map((transaction) => {
            const { id, title, price, description, category, sold, image } =
              transaction;
            return (
              <tr key={id}>
                <th>{id}</th>
                <td>{title}</td>
                <td>{description}</td>
                <td>₹{price}</td>
                <td>{category}</td>
                {sold ? (
                  <td className="text-secondary">Sold</td>
                ) : (
                  <td>Not sold</td>
                )}
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={image} alt={title} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TransactionsList;
