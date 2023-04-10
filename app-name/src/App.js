import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.food;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function FilterTab({ vegOnly, onVegOnlyChange }) {
  return (
    <form>
      <label>
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={(e) => onVegOnlyChange(e.target.checked)}
        />
      </label>
      Click to see the vegetarian option
    </form>
  );
}


function ProductTable({ products, vegOnly }) {
  const rows = [];
  const time = ["breakfast", "lunch", "dinner"];

  for (let i = 0; i < time.length; i++) {
    rows.push(<ProductCategoryRow category={time[i]} />);
    var t = time[i];
    for (let j = 0; j < 3; j++) {
      if (!vegOnly) {
        rows.push(<ProductRow product={products[0][t][j]} key={products.t} />);
      } else {
        if (products[0][t][j].vegetarian) {
          rows.push(
            <ProductRow product={products[0][t][j]} key={products.t} />
          );
        }
      }
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [vegOnly, setVegOnly] = useState(false);
  return (
    <div>
      <FilterTab vegOnly={vegOnly} onVegOnlyChange={setVegOnly} />
      <ProductTable products={products} vegOnly={vegOnly} />
    </div>
  );
}

const PRODUCTS = [
  {
    breakfast: [
      { food: "pancakes", price: 5.0, vegetarian: true },
      { food: "waffles", price: 5.0, vegetarian: true },
      { food: "orange juice", price: 2.0, vegetarian: true }
    ],
    lunch: [
      { food: "turkey sandwich", price: 8.0, vegetarian: false },
      { food: "grilled cheese", price: 6.0, vegetarian: true },
      { food: "hamburger", price: 8.0, vegetarian: false }
    ],
    dinner: [
      { food: "chicken alfredo", price: 10.0, vegetarian: false },
      { food: "tofu stir-fry", price: 9.0, vegetarian: true },
      { food: "chili", price: 8.0, vegetarian: false }
    ]
  }
];

export default function App() {
  return (
    <div>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
