module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ISBN ต้องไม่ซ้ำ
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Available", // เริ่มต้นสถานะของหนังสือ
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pictures: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Book.associate = function (models) {
    // เชื่อมโยง Book กับ Rental ผ่าน isbn แทน bookId
    Book.hasMany(models.Rental, {
      foreignKey: "bookIsbn",
      as: "rentals",
      onDelete: "CASCADE",
    });
  };

  return Book;
};
