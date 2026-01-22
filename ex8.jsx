import React, { useState, useEffect } from 'react';

const productsData = [
  { id: 1, name: 'เสื้อยืด', category: 'เสื้อผ้า', price: 250 },
  { id: 2, name: 'กางเกงยีนส์', category: 'เสื้อผ้า', price: 799 },
  { id: 3, name: 'รองเท้าผ้าใบ', category: 'รองเท้า', price: 1200 },
  { id: 4, name: 'นาฬิกาข้อมือ', category: 'เครื่องประดับ', price: 1500 },
  { id: 5, name: 'หมวกแก๊ป', category: 'เสื้อผ้า', price: 199 },
  { id: 6, name: 'กระเป๋าเป้', category: 'กระเป๋า', price: 950 },
  { id: 7, name: 'แว่นกันแดด', category: 'เครื่องประดับ', price: 499 },
];

function ProductList() {
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('none');
  const [displayProducts, setDisplayProducts] = useState(productsData);

  useEffect(() => {
    let filteredProducts = [...productsData];

    if (filterCategory !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.category === filterCategory
      );
    }

    if (sortBy === 'priceAsc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayProducts(filteredProducts);
  }, [filterCategory, sortBy]);

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  return (
    <div className="product-list-container">
      <h1>รายการสินค้า</h1>

      <div className="filters">
        <label htmlFor="category-filter">กรองตามหมวดหมู่: </label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-options">
        <label htmlFor="sort-by">จัดเรียงตามราคา: </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">ไม่จัดเรียง</option>
          <option value="priceAsc">น้อยไปมาก</option>
          <option value="priceDesc">มากไปน้อย</option>
        </select>
      </div>

      <div
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}
      >
        {displayProducts.map(product => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <h3>{product.name}</h3>
            <p>หมวดหมู่: {product.category}</p>
            <p>ราคา: {product.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
