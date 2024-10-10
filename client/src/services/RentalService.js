import Api from "@/services/Api";

export default {
  index() {
    return Api().get("rentals");
  },
  show(rentalId) {
    return Api().get("rental/" + rentalId);
  },
  post(rental) {
    return Api().post("rental", rental);
  },
  put(rental) {
    return Api().put("rental/" + rental.id, rental);
  },
  delete(rental) {
    return Api().delete("rental/" + rental.id, rental);
  },
  returnRental(rentalId) {
    return Api().put(`rental/${rentalId}/return`);
  },
};
