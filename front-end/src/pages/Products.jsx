import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import { ProductsContext } from '../context/ProductsProvider';
import fetchProducts from '../requests/index';

function Products() {
  const { products,
    setProducts,
    cart,
    // totalPrice,
    // setTotalPrice,
    totalValue,
    setTotalValue } = useContext(ProductsContext);
  const history = useHistory();

  const handlePrice = () => {
    const reduce = cart
      .reduce((acc, curr) => acc + curr.price * curr.qtd, 0)
      .toFixed(2);
    setTotalValue(reduce);
    console.log(typeof totalValue);
    return reduce;
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };

    getProducts();
    handlePrice();
  }, [totalValue]);

  return (
    <div>
      <NavBar />
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ Number(totalValue) === 0 }
          onClick={ () => history.push('/customer/checkout') }
        >
          Ver carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            { totalValue.toString().replace('.', ',') }
          </span>
        </button>
      </div>
      {products.map((product, index) => (
        <ProductsCard
          key={ product.id }
          id={ product.id }
          index={ index }
          name={ product.name }
          price={ product.price }
          thumbnail={ product.url_image }
        />
      ))}
    </div>
  );
}

export default Products;
