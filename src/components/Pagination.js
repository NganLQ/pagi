import React, { useState, useEffect } from "react";

const renderData = (data) => {
  return (
    <ul className="itemPerPage">
      {data.map((item, index) => {
        return <li key={index}>{item.title}</li>;
      })}
    </ul>
  );
};
const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const [maxNumberLimit, setMaxNumberLimit] = useState(5);
  const [minNumberLimit, setMinNumberLimit] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const rederPageNumber = pages.map((number, index) => {
    if (number < maxNumberLimit + 1 && number > minNumberLimit) {
      return (
        <li
          style={{
            padding: "5px",
            background: "red",
            color: "#fff",
            marginLeft: "2px",
            cursor: "pointer",
          }}
          className={currentPage === number ? "active" : null}
          key={index}
          onClick={() => handleClick(number)}
        >
          {number}
        </li>
      );
    }
  });
  const handleClick = (number) => {
    setCurrentPage(number);
  };
  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxNumberLimit) {
      setMaxNumberLimit(maxNumberLimit + pageNumberLimit);
      setMinNumberLimit(minNumberLimit + pageNumberLimit);
    }
  };
  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxNumberLimit(maxNumberLimit - pageNumberLimit);
      setMinNumberLimit(minNumberLimit - pageNumberLimit);
    }
  };
  let btnIncre = null;
  if (pages.length > maxNumberLimit) {
    btnIncre = <li onClick={handleClickNext}>&hellip;</li>;
  }
  let btnDecre = null;
  if (minNumberLimit >= 1) {
    btnDecre = <li onClick={handleClickPrev}>&hellip;</li>;
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((respon) => respon.json())
      .then((json) => setData(json));
  }, []);
  return (
    <div>
      {renderData(currentItems)}
      <div style={{ display: "flex" }}>
        <button disabled={currentPage <= 1} onClick={() => handleClickPrev()}>
          Prev
        </button>
        {btnDecre}
        {rederPageNumber}
        {btnIncre}
        <button
          disabled={currentPage >= pages.length}
          onClick={() => handleClickNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
