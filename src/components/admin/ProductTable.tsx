import type { Product } from "../../types/products";

interface ProductTableProps {
  products: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  loading = false,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (products.length === 0) {
    return <p>Chưa có sản phẩm.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
               {product.image?.[0] ? ( 
                <img
                  src={product.image[0]} 
                  alt={product.title}
                  width={70}
                  height={70}
                />
                ) : (
                 "-"
                )} 
              </td>

              <td>{product.title}</td>

              <td>
                {product.price.toLocaleString("vi-VN")} đ
              </td>

              <td>
                {product.category?.name ?? "-"}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                >
                  Sửa
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(product)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}