import React from "react";
import "./Posts.css";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>CreditCardNumber</th>
            <th>CreditCardType</th>
            <th>Email</th>
            <th>DomainName</th>
            <th>PhoneNumber</th>
            <th>MacAddress</th>
            <th>URL</th>
            <th>UserName</th>
            <th>LastLogin</th>
            <th>PaymentMethod</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.Email}>
              <td>{post.FirstName}</td>
              <td>{post.LastName}</td>
              <td>{post.Gender}</td>
              <td>{post.Latitude}</td>
              <td>{post.Longitude}</td>
              <td>{post.CreditCardNumber}</td>
              <td>{post.CreditCardType}</td>
              <td>{post.Email}</td>
              <td>{post.DomainName}</td>
              <td>{post.PhoneNumber}</td>
              <td>{post.MacAddress}</td>
              <td>{post.URL}</td>
              <td>{post.UserName}</td>
              <td>{post.LastLogin}</td>
              <td>{post.PaymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
