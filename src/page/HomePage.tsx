import AsideBar from "../components/product/AsideBar";
import ProductList from "../components/product/ProductsList";
const HomePage: React.FC = () => {
  return (
    <div className="">
      <AsideBar />
      <div className="absolute top-0 ml-80 ">
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
