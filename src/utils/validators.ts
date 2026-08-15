export function isRequired(
  value: string | null | undefined,
  fieldName: string
): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName} không được để trống.`;
  }

  return null;
}

export function isEmail(
  value: string
): string | null {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value.trim())) {
    return "Email không hợp lệ.";
  }

  return null;
}

export function minLength(
  value: string,
  length: number,
  fieldName: string
): string | null {
  if (value.length < length) {
    return `${fieldName} phải có ít nhất ${length} ký tự.`;
  }

  return null;
}

export function isPhone(
  value: string
): string | null {
  const phoneRegex =
    /^(0|\+84)\d{9,10}$/;

  if (!phoneRegex.test(value.trim())) {
    return "Số điện thoại không hợp lệ.";
  }

  return null;
}

export function isPositiveNumber(
  value: number,
  fieldName: string
): string | null {
  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return `${fieldName} phải lớn hơn 0.`;
  }

  return null;
}