module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define("Rental", {
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Borrowing", // ค่าสถานะเริ่มต้น
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // เชื่อมโยงกับ table Users
        key: "id",
      },
    },
    bookIsbn: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Books", // ชื่อ table ที่เชื่อมโยง (Books)
        key: "isbn", // ใช้ 'isbn' แทน 'id'
      },
    },
  });

  Rental.associate = function (models) {
    Rental.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    // เชื่อมโยง Rental กับ Book ผ่าน isbn โดยใช้ targetKey เป็น isbn แทน id
    Rental.belongsTo(models.Book, {
      foreignKey: "bookIsbn",
      targetKey: "isbn",
      as: "book",
      onDelete: "CASCADE",
    });
  };

  return Rental;
};
