import { useEffect, useState } from "react";

import {
  categoryService,
} from "../../services/categoryService";

import CategoryForm from "../../components/admin/CategoryForm";
import CategoryTable from "../../components/admin/CategoryTable";

import type { Category } from "../../types/category";

export default function AdminCategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [editing, setEditing] =
    useState<Category | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data =
        await categoryService.getCategories();

      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (
  category:Category
  ) => {
    if (
      !window.confirm(
        "Bạn có chắc muốn xóa danh mục?"
      )
    ) {
      return;
    }

    await categoryService.deleteCategory(category.id);

    await loadCategories();
  };

  return (
    <main>
      <h1>Quản lý danh mục</h1>

      <CategoryForm
        category={editing}
        onSuccess={async () => {
          setEditing(null);
          await loadCategories();
        }}
        onCancel={() =>
          setEditing(null)
        }
      />

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </main>
  );
}