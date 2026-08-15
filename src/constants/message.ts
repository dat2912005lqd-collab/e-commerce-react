export const MESSAGE={
    COMMON:{
        LOADING:"Đang tải...",
        ERROR:"Đã xảy ra lỗi.",
        RETRY:"Vui lòng thử lại.",
    },
    AUTH:{
        LOGIN_SUCCESS:"Đăng nhập thành công.",
        LOGIN_ERROR:"Email hoặc mật khẩu không chính xác.",
        LOGOUT_SUCCESS:"Đăng xuất thành công.",
        UNAUTHORIZED:"Vui lòng đăng nhập để tiếp tục.",
        FORBIDDEN:"Bạn không có quyền truy cập.",
    },
    PRODUCT:{
        LOAD_ERROR:"Không thể tải sản phẩm.",
        NOT_ERROR:"Không tìm thấy sản phẩm.",
        CREATE_SUCCESS:"Thêm sản phẩm thành công.",
        UDDATE_SUCCESS:"Cập nhật sản phẩm thành công.",
        DELETE_SUCCESS:"Xóa sản phẩm thành công.",
        DELETE_ERROR:"Không thể xóa sản phẩm",
    },
    CATEGORY:{
        LOAD_ERROR:"Không thể tải danh mục.",
        CREATE_SUCCESS:"Thêm danh mục thành công.",
        UPDATE_SUCCESS:"Cập nhật danh mục thành công.",
        DELETE_SUCCESS:"Xóa danh mục thành công.",
    },
    CART:{
        ADD_SUCCESS:"Đã thêm sản phẩm vào giỏ hàng.",
        EMPTY:"Giỏ hàng đang trống.",
        UPDATE_ERROR:"Không thể cập nhật giỏ hàng.",
    },
    CHECKOUT:{
        LOGIN_REQUIRED:"Vui lòng đăng nhạp để thanh toán.",
        EMPTY_CART:"Giỏ hàng đang trống.",
        SUCCESS:"Đặt hàng thành công."
    }, 
}
as const;