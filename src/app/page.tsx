"use client";

import { useEffect, useState } from "react";

export type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(100);
  const numPerPage = 5;

  const skip = () => {
    return numPerPage * page;
  };

  useEffect(() => {
    console.log("fetching advocates...");

    fetch(
      `/api/advocates?searchValue=${searchTerm}&take=${numPerPage}&start=${skip()}`
    ).then((response) => {
      response.json().then((jsonResponse) => {
        setFilteredAdvocates(jsonResponse.advocates);
        setTotalCount(jsonResponse.totalCount);
      });
    });
  }, [searchTerm, page]);

  const onReset = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <div>
        <p>Search</p>
        <input
          style={{ border: "1px solid black" }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
        />
        <button
          style={{
            width: "150px",
            height: "30px",
            border: "1px solid black",
            marginLeft: "5px",
          }}
          onClick={onReset}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table className="table-auto">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          style={{ width: "150px", height: "30px", border: "1px solid black" }}
          onClick={(e) => setPage(Math.max(page - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          style={{ width: "150px", height: "30px", border: "1px solid black" }}
          onClick={(e) => setPage(page + 1)}
          disabled={page === Math.ceil(totalCount / numPerPage) - 1}
        >
          Next Page
        </button>
      </div>
    </main>
  );
}
