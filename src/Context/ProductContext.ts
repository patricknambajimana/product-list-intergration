// import React, { createContext, useState } from "react";
// import type { ReactNode } from "react";
// import type { Product } from "../type/Products";

// interface ProductContextType {
//   product: Product | undefined;
//   setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
// }

// interface Props {
//   children: ReactNode;
// }

// export const ProductContext = createContext<ProductContextType | undefined>(
//   undefined
// );

// export const ProductProvider: React.FC<Props> = ({ children }) => {
//   const [product, setProduct] = useState<Product | undefined>(undefined);

//   return (
//     <ProductContext.Provider value={product, setProduct }>

//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContext;
