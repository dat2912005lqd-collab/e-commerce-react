import type { Category } from "../../types/category";

interface CategoryTableProps {
  categories: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  loading = false,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (loading) {
    return <p>Đang tải danh mục...</p>;
  }

  if (categories.length === 0) {
    return <p>Chưa có danh mục nào.</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Slug</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>

              <td>
                <img
                  src={category.image}
                  alt={category.name}
                  width={60}
                  height={60}
                />
              </td>

              <td>{category.name}</td>

              <td>{category.slug ?? "-"}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(category)}
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