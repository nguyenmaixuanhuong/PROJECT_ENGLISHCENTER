export const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data.filter((item) => searchNestedObject(item, query.toLowerCase()));
    }
};

const searchNestedObject = (obj, query) => {
    // Duyệt qua tất cả các giá trị trong object
    for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
            // Nếu giá trị là một object, gọi lại đệ quy
            if (searchNestedObject(value, query)) {
                return true;
            }
        } else if (
            value?.toString().toLowerCase().includes(query) // Kiểm tra giá trị là chuỗi
        ) {
            return true;
        }
    }

    return false;
};
