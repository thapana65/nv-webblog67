import Api from "@/services/Api";

export default {
  index() {
    return Api().get("books");
  },

  show(isbn) {
    return Api().get("book/" + isbn);
  },

  post(bookData) {
    return Api().post("book", bookData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file upload
      },
    });
  },

  put(book) {
    return Api().put("book/" + book.isbn, book);
  },

  delete(isbn) {
    return Api().delete("book/" + isbn);
  },

  // Method ใหม่สำหรับการอัปเดตสถานะของหนังสือ
  updateStatus(isbn, status) {
    return Api().put("book/" + isbn + "/status", { status: status });
  },
};
