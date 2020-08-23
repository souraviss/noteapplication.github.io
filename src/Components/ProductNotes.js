import React from "react";
import "./ProductNotes.css";
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
function ProductNotes(props) {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div className="productnotes">
      <table>
        <caption>Products</caption>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("title")}
                className={getClassNamesFor("title")}
              >
                Title
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("body")}
                className={getClassNamesFor("body")}
              >
                Body
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("creator.email")}
                className={getClassNamesFor("creator.email")}
              >
                User Email
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("stock")}
                className={getClassNamesFor("stock")}
              >
                Created Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} key={index}>
              <td>{item.title}</td>
              <td>{item.body}</td>
              {<td>{item.creator?.email}</td>}
              {<td>{item.creator?.createdDate}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductNotes;
